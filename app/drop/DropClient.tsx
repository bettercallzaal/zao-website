'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { supabase, publicUrl, BUCKET, type BrandDrop } from '@/lib/supabaseDrop'

const DEFAULT_FOLDERS = ['Inbox', 'ZAO', 'BetterCallZaal', 'COC Concertz', 'Logos', 'Photos']

function kindOf(type: string): BrandDrop['kind'] {
  if (type.startsWith('image/')) return 'image'
  if (type.startsWith('audio/')) return 'audio'
  return 'file'
}

function safeName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_')
}

export function DropClient() {
  const [items, setItems] = useState<BrandDrop[]>([])
  const [loading, setLoading] = useState(true)
  const [target, setTarget] = useState('Inbox')
  const [newFolder, setNewFolder] = useState('')
  const [busy, setBusy] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [recording, setRecording] = useState(false)
  const fileInput = useRef<HTMLInputElement>(null)
  const recorder = useRef<MediaRecorder | null>(null)
  const chunks = useRef<Blob[]>([])

  const folders = Array.from(new Set([...DEFAULT_FOLDERS, ...items.map((i) => i.folder)]))

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from('brand_drops')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error && data) setItems(data as BrandDrop[])
    setLoading(false)
  }, [])

  useEffect(() => {
    // Fetch-on-mount. The setState calls happen after an await inside load(), not
    // synchronously during the effect, so this is not the re-render loop the rule
    // guards against. Disabled here rather than restructuring working upload code.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load()
  }, [load])

  async function uploadFiles(files: FileList | File[], folder: string) {
    const list = Array.from(files)
    for (const file of list) {
      setBusy(`Uploading ${file.name}...`)
      const path = `${folder}/${Date.now()}-${safeName(file.name)}`
      const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      })
      if (upErr) {
        setBusy(`Failed: ${file.name} - ${upErr.message}`)
        continue
      }
      await supabase.from('brand_drops').insert({
        filename: file.name,
        storage_path: path,
        folder,
        kind: kindOf(file.type),
        size_bytes: file.size,
      })
    }
    setBusy(null)
    await load()
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files.length) uploadFiles(e.dataTransfer.files, target)
  }

  async function updateCaption(id: string, caption: string) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, caption } : i)))
    await supabase.from('brand_drops').update({ caption }).eq('id', id)
  }

  async function moveItem(id: string, folder: string) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, folder } : i)))
    await supabase.from('brand_drops').update({ folder }).eq('id', id)
  }

  async function remove(item: BrandDrop) {
    if (!confirm(`Delete ${item.filename}?`)) return
    await supabase.storage.from(BUCKET).remove([item.storage_path])
    await supabase.from('brand_drops').delete().eq('id', item.id)
    setItems((prev) => prev.filter((i) => i.id !== item.id))
  }

  function dictate(id: string, current: string) {
    const SR =
      (window as unknown as { webkitSpeechRecognition?: unknown; SpeechRecognition?: unknown })
        .webkitSpeechRecognition ||
      (window as unknown as { SpeechRecognition?: unknown }).SpeechRecognition
    if (!SR) {
      alert('Dictation needs Chrome or Safari.')
      return
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rec = new (SR as any)()
    rec.lang = 'en-US'
    rec.interimResults = false
    rec.onresult = (ev: { results: { [k: number]: { [k: number]: { transcript: string } } } }) => {
      const text = ev.results[0][0].transcript
      updateCaption(id, current ? `${current} ${text}` : text)
    }
    rec.start()
  }

  async function toggleVoiceMemo() {
    if (recording) {
      recorder.current?.stop()
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const rec = new MediaRecorder(stream)
      chunks.current = []
      rec.ondataavailable = (e) => chunks.current.push(e.data)
      rec.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop())
        const blob = new Blob(chunks.current, { type: 'audio/webm' })
        const file = new File([blob], `voice-memo-${Date.now()}.webm`, { type: 'audio/webm' })
        await uploadFiles([file], target)
        setRecording(false)
      }
      recorder.current = rec
      rec.start()
      setRecording(true)
    } catch {
      alert('Mic needs permission (and this page open on the device).')
    }
  }

  const grouped = folders
    .map((f) => ({ folder: f, items: items.filter((i) => i.folder === f) }))
    .filter((g) => g.items.length > 0 || g.folder === target)

  return (
    <div className="space-y-8">
      {/* Upload zone */}
      <div>
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <span className="text-sm" style={{ color: 'var(--zao-cream-dim)' }}>
            Drop into:
          </span>
          <select
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="rounded px-3 py-2 text-sm"
            style={{ backgroundColor: 'var(--zao-navy)', color: 'var(--zao-cream)', border: '1px solid var(--zao-border)' }}
          >
            {folders.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
          <input
            value={newFolder}
            onChange={(e) => setNewFolder(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && newFolder.trim()) {
                setTarget(newFolder.trim())
                setNewFolder('')
              }
            }}
            placeholder="+ new folder, press Enter"
            className="rounded px-3 py-2 text-sm"
            style={{ backgroundColor: 'var(--zao-navy)', color: 'var(--zao-text)', border: '1px solid var(--zao-border)' }}
          />
        </div>

        <div
          onDragOver={(e) => {
            e.preventDefault()
            setDragOver(true)
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          onClick={() => fileInput.current?.click()}
          className="cursor-pointer rounded-xl p-10 text-center transition-colors"
          style={{
            border: `2px dashed ${dragOver ? 'var(--zao-cream)' : 'var(--zao-border)'}`,
            backgroundColor: dragOver ? 'var(--zao-panel-hover)' : 'var(--zao-panel)',
          }}
        >
          <p className="text-lg font-bold" style={{ color: 'var(--zao-cream)' }}>
            Drop files here
          </p>
          <p className="mt-1 text-sm" style={{ color: 'var(--zao-cream-dim)' }}>
            or tap to choose - works from any device
          </p>
          <input
            ref={fileInput}
            type="file"
            multiple
            hidden
            onChange={(e) => e.target.files && uploadFiles(e.target.files, target)}
          />
        </div>

        <div className="mt-3 flex items-center gap-3">
          <button
            onClick={toggleVoiceMemo}
            className="rounded px-4 py-2 text-sm font-semibold"
            style={{
              backgroundColor: recording ? '#e5484d' : 'var(--zao-panel)',
              color: recording ? '#fff' : 'var(--zao-cream)',
              border: '1px solid var(--zao-border)',
            }}
          >
            {recording ? 'Stop recording' : 'Record voice memo'}
          </button>
          {busy && (
            <span className="text-sm" style={{ color: 'var(--zao-cream-dim)' }}>
              {busy}
            </span>
          )}
        </div>
      </div>

      {/* Library grouped by folder */}
      {loading ? (
        <p style={{ color: 'var(--zao-cream-dim)' }}>Loading...</p>
      ) : items.length === 0 ? (
        <p style={{ color: 'var(--zao-cream-dim)' }}>
          Nothing dropped yet. Drop your first file above.
        </p>
      ) : (
        grouped.map((group) => (
          <div key={group.folder}>
            <h2 className="mb-4 text-xl font-bold" style={{ color: 'var(--zao-cream)' }}>
              {group.folder}{' '}
              <span className="text-sm font-normal" style={{ color: 'var(--zao-cream-faint)' }}>
                ({group.items.length})
              </span>
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-3 rounded-lg p-4"
                  style={{ border: '1px solid var(--zao-border)', backgroundColor: 'var(--zao-panel)' }}
                >
                  <div
                    className="flex items-center justify-center overflow-hidden rounded"
                    style={{ height: 160, backgroundColor: 'var(--zao-navy)' }}
                  >
                    {item.kind === 'image' ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={publicUrl(item.storage_path)}
                        alt={item.filename}
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : item.kind === 'audio' ? (
                      <audio controls src={publicUrl(item.storage_path)} className="w-full px-3" />
                    ) : (
                      <span style={{ color: 'var(--zao-cream-faint)' }}>File</span>
                    )}
                  </div>

                  <div className="truncate text-sm font-semibold" style={{ color: 'var(--zao-text)' }} title={item.filename}>
                    {item.filename}
                  </div>

                  <div className="flex gap-2">
                    <textarea
                      defaultValue={item.caption}
                      onBlur={(e) => updateCaption(item.id, e.target.value)}
                      placeholder="Caption / note..."
                      rows={2}
                      className="flex-1 rounded p-2 text-sm"
                      style={{ backgroundColor: 'var(--zao-navy)', color: 'var(--zao-text)', border: '1px solid var(--zao-border)' }}
                    />
                    <button
                      onClick={() => dictate(item.id, item.caption)}
                      title="Dictate"
                      className="rounded px-2 text-xs font-semibold"
                      style={{ backgroundColor: 'var(--zao-panel)', color: 'var(--zao-cream)', border: '1px solid var(--zao-border)' }}
                    >
                      Mic
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <select
                      value={item.folder}
                      onChange={(e) => moveItem(item.id, e.target.value)}
                      className="rounded px-2 py-1 text-xs"
                      style={{ backgroundColor: 'var(--zao-navy)', color: 'var(--zao-cream)', border: '1px solid var(--zao-border)' }}
                    >
                      {folders.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => remove(item)}
                      className="text-xs"
                      style={{ color: '#e5847d' }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
