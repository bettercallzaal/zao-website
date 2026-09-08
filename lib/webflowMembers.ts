// The 43 community member profiles carried over from the Webflow build of
// thezao.com, which this site replaces. Extracted from a verified archive of the
// live Webflow site taken 2026-09-07 - bios, artist category, website and social
// links are the members' own words and links, not rewritten.
//
// Gaps here are gaps in the Webflow source, not extraction failures:
//   no category: makk-jay, phantom-mode
//   no bio:      joseph-goats, stilo
// Photos live in /public/members/<slug> and are served from this repo, so they
// survive the Webflow plan lapsing.

// LINK AUDIT - 2026-09-07. All 183 outbound links below were fetched. 170 returned
// 200. The 13 that did not are listed here rather than silently deleted: these are
// the members' own links, carried over verbatim, and they are already dead on the
// live Webflow site today - this carries the defect across, it does not create it.
// Removing someone's link is a decision about them, so it is Zaal's, not this file's.
//
// Dead, control-verified (a known-good URL on the same host returned 200 in the
// same run, so the platform is not simply blocking us):
//   youtube.com/@brookxkoda        brook-x-koda     404   (control @MrBeast = 200)
//   youtube.com/@gesd1             gesd1            404
//   youtube.com/@jangouuforever    jango-uu         404
//   youtube.com/@jedxo             jedxo            404
//   youtube.com/@LOMO_MUSIC        timi-wale-lomo   404
//   x.com/pr0fitvsPr0phet          pr0f-t           404   (control x.com/TheZAODAO = 200)
//   twitter.com/NessyTheRilla      nessytherilla    404
//   twitter.com/jackxmller         jack-miller      404
//   fractgram.web.app/NFT.NYC      attabotty        404
//
// Dead artist websites:
//   wavyfans.net                   hurric4n3ike     NXDOMAIN - domain gone
//   brookxkoda.com                 brook-x-koda     NXDOMAIN - domain gone
//   maxwelladen.com                maxwell-aden     DNS resolves, connection fails
//
// UNMEASURED, not dead:
//   facebook.com/profile.php?id=100086760753082   timi-wale-lomo
//   Facebook returns 400 to this client for every URL tried, including
//   facebook.com/zuck, so it cannot be checked from here. Do not treat as broken.

export type WebflowMember = {
  slug: string
  name: string
  category: string | null
  website: string | null
  photo: string
  bio: string[]
  socials: { label: string; url: string }[]
}

export const WEBFLOW_MEMBERS: WebflowMember[] = [
  {
    slug: 'attabotty',
    name: 'Attabotty',
    category: 'Musician',
    website: 'https://www.attabotty.com/',
    photo: '/members/attabotty.png',
    bio: [
      'AttaBotty is a composer, multi-instrumentalist, and audiovisual storyteller whose name (a phonetic play on "out-of-body") reflects his commitment to creating immersive artistic experiences.',
      'Through theatrical visuals, sonic effects, and captivating music, he guides his audience to the core of his art’s message.',
      'His ability to animate and play instruments like the flute, piano, guitar, and percussion has been essential in shaping his diverse repertoire, fusing 2D/3D animations with live instrumental elements, EDM, lo-fi, and cinematic orchestra.',
      'While much of his work is serious, not all compositions are somber, reflecting AttaBotty\'s vivacious outlook on life.',
      'Since joining Web3 in May 2022, AttaBotty has sold over 10,000 NFTs, collaborated with more than 10 Web3 artists, earned a place on the Base Onchain Registry, and had his animation selected for the NFT.NYC2024 animation category.',
    ],
    socials: [
      { label: 'X', url: 'https://twitter.com/AttaBotty' },
      { label: 'Instagram', url: 'https://www.instagram.com/attabotty/' },
      { label: 'TikTok', url: 'https://www.tiktok.com/@attabotty' },
      { label: 'YouTube', url: 'https://www.youtube.com/channel/UC3cB4FnMIRKcNFGUOPvNvsg' },
    ],
  },
  {
    slug: 'bettercallzaal',
    name: 'BetterCallZaal',
    category: 'Developer',
    website: 'https://thezao.com',
    photo: '/members/bettercallzaal.png',
    bio: [
      'Building ZAO and ZABAL',
    ],
    socials: [],
  },
  {
    slug: 'brook-x-koda',
    name: 'Brook X Koda',
    category: 'Musician',
    website: null,
    photo: '/members/brook-x-koda.png',
    bio: [
      'Meet Brook x Koda, real twin sisters whose journey from Chicago to Miami\'s music scene is nothing short of magical. Their musical roots trace back to childhood R&B sessions curated by their mom, shaping a style that fuses pop, hip-hop, alternative, and R&B. Smooth melodies and lyricism are the building blocks of their signature sound.',
      '‍',
      'Love, abundance, and genuine emotions infuse every lyric, conveying a consistent message that resonates deeply with their fans.',
    ],
    socials: [
      { label: 'Amazon Music', url: 'https://music.amazon.com/artists/B08H4KB1NY/brookxkoda' },
      { label: 'Apple Music', url: 'https://music.apple.com/us/artist/brook-x-koda/1501502453' },
      { label: 'YouTube Music', url: 'https://music.youtube.com/channel/UCMzEwDFWdaVkI_MhR4IUurA' },
      { label: 'TikTok', url: 'https://www.tiktok.com/@brookxkodaa' },
    ],
  },
  {
    slug: 'clejan',
    name: 'Clejan',
    category: 'Musician',
    website: 'https://clejan.com',
    photo: '/members/clejan.png',
    bio: [
      'Zac Clejan, known professionally as \'Clejan\', is an American rapper, singer, songwriter and classically trained violinist from Atlanta, GA.',
      'Working a corporate gig by day and teaching himself how to produce music by night, he began experimenting with his sound by combining his vocals and violin with trap music, a sub-genre of hip hop birthed in ATL.',
      'He dubbed this unique concept \'Trap Violin,\' & in July 2020 independently released his first home studio project \'The Way That I Fiddle.\'',
      'Since then Clejan has appeared on the Kelly Clarkson Show, opened up for Busta Rhymes, Snoop Dogg, French Montana & Soulja Boy, & performed as a special guest on his inspiration Lindsey Stirling\'s tour, all helping his social following grow to over 1 million under his handle @thetrapviolinist.',
      'He has released 70 original songs to this date with over 10 million streams across platforms.',
      '‍',
    ],
    socials: [
      { label: 'Amazon Music', url: 'https://music.amazon.com/artists/B07KDGZY7D/clejan' },
      { label: 'Apple Music', url: 'https://music.apple.com/us/artist/clejan/1486278538' },
      { label: 'YouTube Music', url: 'https://music.youtube.com/channel/UCTvSNYtIG88U_z_mDefykDQ' },
      { label: 'Spotify', url: 'https://open.spotify.com/artist/6CbxzZHyeIz1Pig7giCufl?si=JZ774YcnTBSfP5_p8wxLMA' },
      { label: 'X', url: 'https://twitter.com/clejanmusic' },
      { label: 'Instagram', url: 'https://www.instagram.com/thetrapviolinist/' },
      { label: 'TikTok', url: 'https://www.tiktok.com/@thetrapviolinist?lang=en' },
      { label: 'YouTube', url: 'https://www.youtube.com/channel/UCoYv2XQDO0jEBdu6e1HO0oQ' },
    ],
  },
  {
    slug: 'cristal-maze',
    name: 'Cristal Maze',
    category: 'Musician',
    website: null,
    photo: '/members/cristal-maze.png',
    bio: [
      'Sensual dance sounds and rhythmic flows, the sound of Cristal Maze will leave you memorized. Brooklyn born artist Cristal Maze is a pop rapper, songwriter, and producer who breaks down the walls to show how multidimensional she is. Her smash hit RELAX had reached a massive audience spreading her fan base world wide. This Brooklyn born goddess is creating a new lane of music for her fans to live, dance, and experience the Cristal Maze energy.',
    ],
    socials: [],
  },
  {
    slug: 'daniel-obute',
    name: 'Daniel Obuté',
    category: 'Musician',
    website: null,
    photo: '/members/daniel-obute.png',
    bio: [
      'Daniel Obuté Aba is a 23-year-old singer-songwriter hailing from Nigeria.',
      'With a passion for pioneering the future of music in the digital space, Daniel is deeply immersed in the world of Web3 music.',
      'He is a proud member of ZAO, a prominent Web3 music group known for its innovation and creativity.',
      'Recognized as the inaugural Community Member of the Month, Daniel\'s dedication to his craft and his community is evident in every note he plays and every lyric he pens.',
      'His music is a seamless blend of pop/rnb sounds with modern influences, creating a unique and captivating auditory experience.',
      'As a trailblazer in the Web3 music scene, Daniel Aba is poised to leave an indelible mark on the industry, pushing boundaries and reshaping the way we experience and interact with music in the digital age.',
      '‍',
    ],
    socials: [
      { label: 'Instagram', url: 'https://instagram.com/danielobutee' },
      { label: 'Apple Music', url: 'https://music.apple.com/ng/artist/daniel-obut%C3%A9/1689202674' },
      { label: 'Spotify', url: 'https://open.spotify.com/artist/5FPLqTys3eNuqINrJWAGJ5?si=1XZvy6jqT8uV0A8uCksnwg' },
      { label: 'X', url: 'https://twitter.com/danielgenius81' },
      { label: 'TikTok', url: 'https://www.tiktok.com/@danielobutee' },
    ],
  },
  {
    slug: 'dcoop',
    name: 'DCoop',
    category: 'Musician',
    website: null,
    photo: '/members/dcoop.png',
    bio: [
      'DCoop isn’t just an artist; he’s a man of the people—never above, always equal—and strives to embody that in all that he does. Blending hip hop with an eclectic range of genres including, but not limited to; reggae, rock, punk, tribal, country, and R&B, DCoop creates an experimental sound unlike anything you’ve heard before. Infused with spiritual frequencies (ranging from 432 Hz to over 900 Hz), his music transcends the traditional, serving as a vehicle for conscious healing and a catalyst for transformation.',
      'But DCoop’s artistry doesn’t stop at music. As the founder of The Village Entertainment Collective (The VEC), an independent label and artist collective, he has set out on a mission to educate, elevate, and empower independent artists. Through The VEC, DCoop collaborates with creators and projects that share his vision, cultivating a community driven by culture over currency. The collective is more than a label—it’s a continuously developing ecosystem and brand that pivots regularly with the turns of the tides. Together, these ventures fuel The VEC’s mission while channeling revenue into progressive philanthropic support systems, ensuring the work inspires both art and action.',
      'DCoop’s creative journey began early. At just five years old, he picked up the pen to write poetry that struck a chord beyond his years. By 12, he was strumming a guitar, and by 15, he was mastering the saxophone, sparking his passion for music and igniting his path into hip hop and punk rock. From the start, he embraced art over expectation, blending passion with purpose—and a fearless attitude that defies convention.',
      'A true student of life, DCoop’s creativity knows no bounds. Beyond the studio, he explores yoga, fire spinning, meditation, tai chi, surfing, boxing, and even cliff diving—pushing his limits in every direction to live boldly and inspire others to do the same. His artistry is a reflection of his life: dynamic, fearless, and deeply rooted in the belief that music and movement have the power to reshape the world.',
      'If you’re ready for something raw, real, and revolutionary, tap in. DCoop is here to change the game—and invite you to be a part of the journey.',
    ],
    socials: [],
  },
  {
    slug: 'eduard',
    name: 'Eduard',
    category: 'Artist',
    website: null,
    photo: '/members/eduard.png',
    bio: [
      'I’m an artist exploring the spaces between emotion, identity, and imagination.',
      'My work blends AI, visual storytelling, and writing to capture moments that feel hard to express through traditional forms.',
      'My art has been exhibited internationally in cities such as New York, Las Vegas, and Bucharest.',
      'I create to understand, to connect, and to offer others a sense of recognition and presence. If my art can make someone feel seen or inspired, I’ve done what I came here to do. 🌹',
    ],
    socials: [
      { label: 'Instagram', url: 'https://www.instagram.com/eduardmsmr?igsh=dHBhZDQwcndtOXo3&utm_source=qr' },
    ],
  },
  {
    slug: 'erin-hyvin',
    name: 'Erin Hyvin',
    category: 'Musician',
    website: null,
    photo: '/members/erin-hyvin.png',
    bio: [
      'Erin Hyvin is a singer-songwriter and artist from Spain.',
      'She began her musical journey at a very young age when she started taking singing and acting classes.',
      'Later on, she taught herself the guitar and before long she started writing her own songs.',
      'After living in Los Angeles for a while, she felt the need to turn all that experience into songs and share them with the world.',
      'In 2023, she self-released her debut EP \'It Was All A Dream\' - 5 songs exploring the \'American Dream\' through Erin’s eyes - a fantasy-like world filled with a sense of freedom, manufactured fame, and shattered dreams.',
      'Through her music, Erin invites us all to join her on a healing journey where love is always the answer.',
    ],
    socials: [
      { label: 'amazon.com', url: 'https://amazon.com/music/player/artists/B0BX4DQZTB/erin-hyvin?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_eZ8nF9ZzAyWdIlM16jCfBFqHz' },
      { label: 'Apple Music', url: 'https://music.apple.com/us/artist/erin-hyvin/1675229967' },
      { label: 'YouTube Music', url: 'https://music.youtube.com/channel/UCdKCJGc7_M1s72REmsjDd_A' },
      { label: 'Spotify', url: 'https://open.spotify.com/artist/6P33MqTKXCQXJm5jCz01tm?si=gOq6EpeQRJChv6KrxOu3gw' },
      { label: 'Instagram', url: 'https://www.instagram.com/erinhyvin/' },
      { label: 'TikTok', url: 'https://www.tiktok.com/@erinhyvin' },
      { label: 'YouTube', url: 'https://www.youtube.com/@erinhyvin' },
      { label: 'X', url: 'https://x.com/erinhyvin' },
    ],
  },
  {
    slug: 'faetd',
    name: 'FAETD',
    category: 'Musician',
    website: null,
    photo: '/members/faetd.png',
    bio: [
      'Filip, better known as FAETD, is a music producer and sound engineer with over 10 years in the game. He\'s worked on all kinds of projects, from mixing tracks to ghost producing hits.He makes electronic music, mainly house, but loves exploring and playing with different genres of electronic music. As an AI enthusiast, he loves combining AI visuals with his music, creating unique and captivating experiences. He\'s also into exploring the potential of blockchain in the music world.',
    ],
    socials: [
      { label: 'Apple Music', url: 'https://music.apple.com/us/artist/faetd/1729641758' },
      { label: 'YouTube Music', url: 'https://music.youtube.com/channel/UCJoeTndLPODnmOGR1DOGMBQ' },
      { label: 'Spotify', url: 'https://open.spotify.com/artist/2eNeai19eDmZ0HNUsZe3Ud?si=OmiHbBhNTTeiBjrRElD3ug' },
      { label: 'X', url: 'https://twitter.com/faetdd' },
      { label: 'amazon.com', url: 'https://www.amazon.com/music/player/artists/B0CGKNCJSX/faetd' },
      { label: 'Instagram', url: 'https://www.instagram.com/faetd_/' },
      { label: 'YouTube', url: 'https://www.youtube.com/channel/UCz37JcVoXp3t6qqnHQo35dw' },
    ],
  },
  {
    slug: 'fellenz',
    name: 'FΞLLΞNZ',
    category: 'Musician',
    website: 'https://linktr.ee/fellenzmusic',
    photo: '/members/fellenz.png',
    bio: [
      'Tom\'s music has been featured on several NFT project tokens, from Founder\'s Tokens for NFT FM and Fanfare, sound design for Fat Cats\' PFP marketing campaign, all five (5) Meta-Rides NFT Pit Passes, along with his his own NFT releases which include Smoked Skies, Majik Karpet and Top Down!',
      'His Guitar Playing style is rooted in Rock, Progressive Rock, Blues, R&B, and some Smooth Jazz to round it out!',
      'His Soundtrack Compositions are all about taking journeys, ranging from spatial sound scapes to visceral rock.',
      'As founder, MC, and tech of his "NFT Music Hall" virtual world concert venue, he has hosted over 40 musicians.',
    ],
    socials: [
      { label: 'Twitch', url: 'https://www.twitch.tv/fellenzmusic' },
      { label: 'YouTube', url: 'https://www.youtube.com/tfellenz' },
      { label: 'X', url: 'https://x.com/fellenzmusic' },
    ],
  },
  {
    slug: 'formerly-len',
    name: 'Formerly LEN',
    category: 'Musician',
    website: 'https://hypeddit.com/noplu',
    photo: '/members/formerly-len.png',
    bio: [
      'Dallas-based recording artist Formerly LEN is a jack of all trades, and aims to master them all.',
      'Since 2020, LEN has independently released 2 mixtapes, 3 EPs, and a collaborative album with Wesdorp titled “Path to a New Me”.',
      'His unpredictable sound has evidently grown throughout his artistic journey, most recently dropping “No Page Left Unturned”, a living mixtape that showcases every stylistic corner of hip-hop.',
      'Formerly LEN’s constantly-evolving approach to his music makes him an exciting talent to look out for in the coming years.',
      '‍',
    ],
    socials: [
      { label: 'Apple Music', url: 'https://music.apple.com/us/artist/formerly-len/1536989729' },
      { label: 'Spotify', url: 'https://open.spotify.com/artist/2FlXbD1Ptb0PbrPzVP0L50?si=s-wccFRDQEWU5pJXFiOEqw' },
      { label: 'Instagram', url: 'https://www.instagram.com/formerlylen' },
      { label: 'X', url: 'https://x.com/FormerlyLEN' },
    ],
  },
  {
    slug: 'gesd1',
    name: 'GESD1',
    category: 'Musician',
    website: 'https://linktr.ee/gesd1',
    photo: '/members/gesd1.png',
    bio: [
      'Emmanuel Temitope Ariyo AKA GESD1, a Rapper hails from ondo state, but was born and brought up in Kaduna State(croc city), West African Nigeria.',
      'A versatile artist who does all genre. Started his music career at the age of 9 as a rapper but love r&b & dancehall  that particular period.',
    ],
    socials: [
      { label: 'TikTok', url: 'http://tiktok.com/@gesd01100' },
      { label: 'X', url: 'https://x.com/Gesd01' },
    ],
  },
  {
    slug: 'godcloud',
    name: 'GodClouD',
    category: 'Musician',
    website: 'https://www.godcloud.org/',
    photo: '/members/godcloud.png',
    bio: [
      'Commanding any instrument on stage or in studio Godcloud, an artist as unique as his name, is truly an experience to behold.',
      'His talents have managed to get the attention of Akai, Reason Studios, XLN Audio and Fender landing him frequent rotation on social media for product demos.',
      'Having worked with a multitude of local and national acts (.38 spesh, Jimmie Highsmith Jr, Rob Compa, Jesse Sprinkle, Misha Frambro, Johnny Polygon, Ovtlier, Eerie Canal, Ill Gates, DJ EASE, George Lopez and Andy Vargas of Santana) Crossing several genres, Godcloud blends aural flavors and textures without sacrificing their defining core qualities.',
      'GodclouD has been featured in a multitude of publications including: Forbes, The Chicago Tribune, Rochester City magazine, Floated magazine, Revolver Magazine and Alternative press with Ovtlier.',
      'Bass magazine, bass gear magazine, V13 media and prog magazine with emmy award winning band Combinator.',
    ],
    socials: [
      { label: 'Instagram', url: 'https://www.instagram.com/therealgodcloud' },
      { label: 'X', url: 'https://x.com/therealgodcloud' },
    ],
  },
  {
    slug: 'goldilox',
    name: 'Goldilox',
    category: 'Musician',
    website: null,
    photo: '/members/goldilox.png',
    bio: [
      'Goldilocks, aka yesiamgoldilocks, is a Reggaeton and Hip-Hop artist from NYC, by way of Asturias, Spain.',
      'Her hit record \'Saab Story\' debuted on Spotify\'s \'New Music Friday Latin\' Playlist and her first fully Spanish record, \'La Que No,\' was featured on NPR’s \'Alt.Latino\' Playlist.',
      'She was invited to do one-liners for iHeart Radio, telling her "coming out" story for \'National Coming Out Day 2020,\' had the honor to perform in the Amazon Music \'Together At Home’ Concert series to premiere her single \'Bañador,\' and has been featured in media outlets such as CNN\'s “Zona Pop,” Univision / Uforia Austin, Dash Radio, and many others.',
      'Goldilocks is a multi-instrumentalist producer that uses her life-long background in music to write and compose fun, sexy, fully bilingual music that makes people feel confident and understood, drawing inspiration from her own experiences, as well as from artists she admires like J Balvin, Kanye West, Pharrell and Bad Bunny, to name a few.',
      'Her debut album ‘Future Famous,’ which was recorded in the midst of the pandemic, features lyrics in English as well as Spanish and is available for streaming and purchase now. Her freshman album boasts 12 self-produced songs, along with one track produced by L O U I S M E.',
    ],
    socials: [],
  },
  {
    slug: 'gritbeat',
    name: 'Gritbeat',
    category: 'Musician',
    website: null,
    photo: '/members/gritbeat.png',
    bio: [
      'Began my journey as a young kid and a violin.',
      'Moved on to production before my teens and developed a pallete for several genres and djing.',
      'Am no not only producing my solo music but producing for artists globally.',
    ],
    socials: [],
  },
  {
    slug: 'grl-krash',
    name: 'GRL KRASH',
    category: 'Musician',
    website: 'https://www.krash.world/',
    photo: '/members/grl-krash.png',
    bio: [
      'GRLKRASH is an R&B luminary who has been captivating audiences since 2015 with their sensual, energetic, and dreamy sound.',
      'Their live performances have graced 5 major U.S. cities, and their music has been featured on over 30 Spotify playlists.',
      'Beyond their stage presence, GRLKRASH is a behind-the-scenes maestro, having written demos for notable artists like Kehlani, Kaash Paige, and Latto.',
      'A true musical visionary, GRLKRASH’s journey is defined by a passion for music and an unwavering commitment to perfection, shaping the future of R&B.',
    ],
    socials: [
      { label: 'amazon.com', url: 'https://amazon.com/music/player/artists/B0CSF2DBYF/grlkrash?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_xIGJ124d3YtaMfY2Ej1SqkNXB' },
      { label: 'Apple Music', url: 'https://music.apple.com/us/artist/grlkrash/1633153693' },
      { label: 'YouTube Music', url: 'https://music.youtube.com/channel/UC0jBH1EwFncRcldGju_tAAA?si=TmCxfI3STTy52ML9' },
      { label: 'Spotify', url: 'https://open.spotify.com/artist/4hc1t3A4CTdvMyCGJdt5B8?si=cHmB0TVJRzuhlzs2BVy8cQ' },
      { label: 'X', url: 'https://twitter.com/grlkrash' },
      { label: 'Instagram', url: 'https://www.instagram.com/grlkrash/' },
      { label: 'TikTok', url: 'https://www.tiktok.com/@grlkrash1?is_from_webapp=1&sender_device=pc' },
    ],
  },
  {
    slug: 'hexidized',
    name: 'Hexidized',
    category: 'Musician',
    website: null,
    photo: '/members/hexidized.png',
    bio: [
      'With just over 20 years as a live performing artist Charles Ledbetter has produced and written songs across multiple genres with local upcoming artist exclusively in the underground scene.',
      'With the new turn and changes in the music industry Charles aka Hexidized has seized the opportunity to be a part of the difference and set the new standards in the industry.',
      '‍',
    ],
    socials: [
      { label: 'Instagram', url: 'https://www.instagram.com/hexidized/' },
      { label: 'X', url: 'https://x.com/hexidized' },
    ],
  },
  {
    slug: 'hurric4n3ike',
    name: 'Hurric4n3Ike',
    category: 'Musician',
    website: null,
    photo: '/members/hurric4n3ike.png',
    bio: [
      'Yo, names Hurric4n3Ike, and I Give Em\' Wavez. Particularly I have been releasing new songs, instrumentals, music videos, podcasts, and even doing shows every single Wednesday under my \'WavyWednesday\' campaign for more than 5 years straight, and I have no plans of slowing down. My mission is to create and share music created at the natural 432 hz frequency that heals the planet, awakens souls, and helps others become the best version of themselves. By vibing with me you are directly supporting my mission of healing the planet and providing the world with a fresh sound of positive, natural, motivational, and sensational music. Stay Blessed and Stay Wavy Fam.',
    ],
    socials: [
      { label: 'Amazon Music', url: 'https://music.amazon.com/artists/B07J1QDNWM/hurric4n3ike?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_Yjzxbya0yBnMRS4BS5TLiVFMw' },
      { label: 'Apple Music', url: 'https://music.apple.com/us/artist/hurric4n3ike/1267241414' },
      { label: 'YouTube Music', url: 'https://music.youtube.com/channel/UCQLMrAFJOQgk329A8xjny2w' },
      { label: 'Spotify', url: 'https://open.spotify.com/artist/5x3pUgROCueytLsG0Xy35H?si=V928dXfKTK2yCk5Xlbo4kQ&nd=1&dlsi=267f8575305b482a' },
      { label: 'X', url: 'https://twitter.com/hurric4n3ike?t=_My3sOy7lLlK_jaaLMeJig' },
      { label: 'Instagram', url: 'https://www.instagram.com/hurric4n3only?utm_source=qr' },
      { label: 'TikTok', url: 'https://www.tiktok.com/@hurric4n3ike' },
      { label: 'YouTube', url: 'https://www.youtube.com/channel/UC8segrP2xuuHvPU94a2b5ig' },
    ],
  },
  {
    slug: 'iamthanos',
    name: 'IAMTHANOS',
    category: 'Musician',
    website: null,
    photo: '/members/iamthanos.png',
    bio: [
      'IAmThanos Graduated From the School of Hard Knocks.',
      'He is a Father First, Battler, and Recording Artist just looking to resonate with the people who miss the golden era.',
    ],
    socials: [],
  },
  {
    slug: 'izmpande',
    name: 'IzMpande',
    category: 'Musician',
    website: null,
    photo: '/members/izmpande.png',
    bio: [
      'IzMpande is a soulful emcee with South African roots and a New York presence. Born in exile to freedom fighters. He spreads positivity through heartfelt music, captivates as an emcee, and he played a pivotal role in South African music.',
    ],
    socials: [
      { label: 'Instagram', url: 'https://www.instagram.com/izmpande?igsh=NG9mYmk1N3ZlbTN6&utm_source=qr' },
      { label: 'TikTok', url: 'https://www.tiktok.com/@izmpande?_t=8p7NLMTF4uc&_r=1' },
      { label: 'X', url: 'https://x.com/coachroots?s=21' },
      { label: 'YouTube', url: 'https://youtube.com/@izmpande?si=60guplZOGi6QFceV' },
    ],
  },
  {
    slug: 'jack-miller',
    name: 'Jack Miller',
    category: 'Musician',
    website: 'https://jackmillermusic.com/',
    photo: '/members/jack-miller.png',
    bio: [
      'Jack Miller is a 23 year-old artist from New York.',
      'Jack aims to create genre-bending music - blending elements of indie-pop, alternative hip-hop, and bedroom pop.',
      'The main message he wants his fans to take away from his music is "stop overthinking everything; sometimes it\'s just not that deep."',
      'Returning from a brief hiatus from music, Jack aims to start off 2024 strong with plans to release the latest EP in his "Bedroom Bops" series within the next few months.',
      '‍',
    ],
    socials: [
      { label: 'Apple Music', url: 'https://music.apple.com/us/artist/jack-miller/1505220626' },
      { label: 'Spotify', url: 'https://open.spotify.com/artist/1L2dgYrQs4HZDHfYB2klTF?si=38ls6SlKQRyRqsEq72vkJg&nd=1&dlsi=cd89a047a5a74213' },
      { label: 'Instagram', url: 'https://www.instagram.com/jackmxller' },
      { label: 'TikTok', url: 'https://www.tiktok.com/@jackmxller?_t=8klOtU8Ruu6&_r=1' },
    ],
  },
  {
    slug: 'jadyn-violet',
    name: 'Jadyn Violet',
    category: 'Musician',
    website: 'https://raverrealm.xyz/',
    photo: '/members/jadyn-violet.png',
    bio: [
      'Jadyn Violet is a passionate community builder and an artist born and raised in the small town of Franklin, New Jersey. He ditched the traditional path of business school to chase his dreams of becoming a musician and pioneer in the decentralized technology movement. With five years of experience in music production, Jadyn is a master of trading attention and building communities.',
      'In 2021, he stumbled upon the web3 music scene and knew he had found his calling. He quickly mobilized, launching the Underground Violet Rave, a daily Twitter Space where he fostered connections and discussions about the future of music and technology.',
      'Jadyn\'s passion and drive paid off in April of 2022 when he released his first NFT, the Violet Token, which sold out in mere hours. Throughout the year, innovation and experimentation were on the top of the mind. Jadyn has sold out multiple music collectible collections, done the first ever Ai live performance video, built one of the first independent token gated artist websites, held 24 hour shows, and on-boarded over 300 people into the web3 space.',
      '‍',
    ],
    socials: [
      { label: 'Amazon Music', url: 'https://music.amazon.com/artists/B081KVKVWQ/jadyn-violet' },
      { label: 'Apple Music', url: 'https://music.apple.com/us/artist/jadyn-violet/1488149647' },
      { label: 'YouTube Music', url: 'https://music.youtube.com/channel/UCYbJTVMA7QmNOmvlUa8tApQ' },
      { label: 'Spotify', url: 'https://open.spotify.com/artist/3EzhvtRgIkIPK0VYNv1ooV' },
      { label: 'X', url: 'https://twitter.com/jadynviolet' },
      { label: 'Instagram', url: 'https://www.instagram.com/jadynviolet/?hl=en' },
      { label: 'TikTok', url: 'https://www.tiktok.com/@jadynviolet' },
    ],
  },
  {
    slug: 'jango-uu',
    name: 'Jango UU',
    category: 'Musician',
    website: null,
    photo: '/members/jango-uu.png',
    bio: [
      'Jango UU, professionally recognized as JANGO, is a multifaceted musician headquartered in New York City. His repertoire spans an eclectic mix of genres, from hip-hop and alternative R&B to house and electronic pop, showcasing his dexterity in sonic experimentation and his deft adaptability to various musical styles.',
      'Beginning his musical odyssey in 2016, Jango initially explored music as a creative outlet, drawing significant influence from eminent artists such as A$AP Rocky, Denzel Curry, KILLY, 88GLAM, and the revered late XXXTENTACION. A period of four years was dedicated to the honing of his craft, involving prolific songwriting, meticulous recording, and precise mixing, all executed in collaboration with a close-knit group of friends.',
      'On February 20th, Jango UU formally embarked on his professional journey, marking his entry into the music industry with the release of his debut 3-track work, \'WIDE AWAKE.\' Subsequent to this, he has enriched his discography with two extended play records and an array of singles, each piece manifesting his dynamic range and maintaining a consistent uniqueness of voice that is distinctly Jango. Regardless of the genre he navigates, Jango UU ensures his artistic identity remains at the heart of every creation, encapsulating his audience with his singular sonic aesthetic.',
      'Jango UU\'s journey as a musician has been marked by artistic evolution, genre exploration, and collaborations with talented producers and artists. With each release, he continues to push boundaries and captivate listeners with his unique sound and introspective lyrics. As a fan, it\'s exciting to witness Jango UU\'s growth and eagerly anticipate what he will bring to the music scene next.',
    ],
    socials: [
      { label: 'Amazon Music', url: 'https://music.amazon.com/artists/B0C9L9YNVL/jango-uu' },
      { label: 'Apple Music', url: 'https://music.apple.com/us/artist/jango-uu/1726641175' },
      { label: 'YouTube Music', url: 'https://music.youtube.com/channel/UCl_VvAZmdCv6UI6YAnqMoLg' },
      { label: 'Spotify', url: 'https://open.spotify.com/artist/5nc2dgefoPLfvsrJVx3PNz?si=vUOrPzpCRZS_WmIMRSSiOg' },
      { label: 'X', url: 'https://twitter.com/jangouuforever' },
      { label: 'Instagram', url: 'https://www.instagram.com/jangouuforever/?hl=en' },
      { label: 'TikTok', url: 'https://www.tiktok.com/@jangouuforever' },
    ],
  },
  {
    slug: 'jaystreetz',
    name: 'Jaystreetz',
    category: 'Musician',
    website: null,
    photo: '/members/jaystreetz.png',
    bio: [
      'Adeniran Adisa a.k.a "Jaystreetz" from west AfricaNigeria a musician, songwriter and a music producer my music style is deeplyrooted in the vibrant sounds of the streets. I draw my inspiration from streetperformers, traditional African beats, and the raw stories of my community.',
      'His unique Afrobeat style fuses these influences, creating music that resonates with authenticity and energy.',
      '‍',
    ],
    socials: [
      { label: 'Spotify', url: 'https://open.spotify.com/artist/5kUeVLOtLxWbz88hKQX5kE?si=9tCNGBKfRRSeBrwDMiFlbw&utm_medium=share&utm_source=linktree&nd=1&dlsi=2a8209382d434c20' },
      { label: 'YouTube', url: 'https://www.youtube.com/@streetzishere4691' },
      { label: 'X', url: 'https://x.com/I_StreetzIsHERE' },
    ],
  },
  {
    slug: 'jedxo',
    name: 'JED XO',
    category: 'Musician',
    website: null,
    photo: '/members/jedxo.png',
    bio: [
      'EBENEZER is from Nigeria.',
      'His life\'s tapestry is woven with threads of devotion to music and a deep-seated connection to his roots.',
      'The rhythm of the conga drum ignited his musical journey, leading him from the sanctuary of the church to the global music stage.',
      'His digital odyssey began within the online music community, where his cypher performances and collaborations with fellow emerging artists shaped his presence.',
      'Yet, it was the enchanting world of Web3 that unveiled his true calling.',
      'Witnessing independent artists flourish through music NFTs, he realized he could sculpt his career without the traditional scaffold of major labels.',
    ],
    socials: [
      { label: 'Apple Music', url: 'https://music.apple.com/ng/artist/jed-xo/1652142873' },
      { label: 'Spotify', url: 'https://open.spotify.com/artist/1Pt2likNBEJX171Q974e7F?si=HKnT2JxCRMqxIcVgcT5MzQ&nd=1&dlsi=e82c2a808ccc410f' },
      { label: 'Instagram', url: 'https://www.instagram.com/1jedxo/' },
      { label: 'TikTok', url: 'https://www.tiktok.com/@only1jedxo' },
      { label: 'X', url: 'https://x.com/1jedxo' },
    ],
  },
  {
    slug: 'joseph-goats',
    name: 'Joseph Goats',
    category: 'Musician',
    website: null,
    photo: '/members/joseph-goats.png',
    bio: [],
    socials: [],
  },
  {
    slug: 'losi',
    name: 'Losi',
    category: 'Musician',
    website: null,
    photo: '/members/losi.png',
    bio: [
      'Losi is a singer-songwriter, creative, and entrepreneur from Cali, Colombia.',
      'Her music journey began 2 years ago, and since she has released several songs, and expanded her footprint in web3 selling her songs to collectors on the blockchain.',
      'Losi\'s songs are an autobiography, a memoir to life experiences.',
      'From love to heartbreak, and from fear to bravery - her songs express her story about overcoming health battles, committing to following her dreams, and all the mess in between.',
    ],
    socials: [
      { label: 'amazon.com', url: 'https://amazon.com/music/player/artists/B0CVR61GNZ/losi?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_kGdxPSmC87hP4qgMyDfTq5vHr' },
      { label: 'Apple Music', url: 'https://music.apple.com/us/artist/losi/1576087926' },
      { label: 'Spotify', url: 'https://open.spotify.com/artist/6M6yBsOJ4aYKwOuaKHh1JY?si=JiD6qnd4SzmpsnDRnjcKOw' },
      { label: 'X', url: 'https://twitter.com/iamlosi' },
      { label: 'Instagram', url: 'https://www.instagram.com/isabellalosada/' },
      { label: 'TikTok', url: 'https://www.tiktok.com/@iamlosi____?is_from_webapp=1&sender_device=pc' },
    ],
  },
  {
    slug: 'makk-jay',
    name: 'Makk Jay',
    category: null,
    website: null,
    photo: '/members/makk-jay.png',
    bio: [
      'Makk.Jayy is a rap, pop, and rock artist from Nigeria and he has been making music since he was 14.',
      'At 17 he joined a rap group before deciding to go solo.',
      'Music is his Inspiration and he doesn\'t see himself doing anything else',
    ],
    socials: [],
  },
  {
    slug: 'marica',
    name: 'Marica',
    category: 'Musician',
    website: null,
    photo: '/members/marica.png',
    bio: [
      'Marica is a professional concert-master violinist from Croatia.',
      'Marica is also a singer and a songwriter.',
      'She started Web 3 a year ago.',
      'She performs mostly live and enjoy very much being on stage.',
      'Marica is also a session musician for other artists.',
      'She has been on stage since she was 8, and have performed in all shapes and forms: from orchestras, to chamber music, as a soloist with an orchestra or piano.',
      'She was also a lead singer with her band in big venues as well as backing vocalists for some prominent names of Croatian music scene',
    ],
    socials: [
      { label: 'Spotify', url: 'https://open.spotify.com/artist/6B5MVJdfwOKeORr7r7xm5g' },
      { label: 'Instagram', url: 'https://www.instagram.com/ma.re.89' },
      { label: 'TikTok', url: 'https://www.tiktok.com/@madamviolin89' },
      { label: 'YouTube', url: 'https://www.youtube.com/@MaricaVIL' },
      { label: 'X', url: 'https://x.com/marica_eth' },
    ],
  },
  {
    slug: 'maxwell-aden',
    name: 'Maxwell Aden',
    category: 'Musician',
    website: null,
    photo: '/members/maxwell-aden.png',
    bio: [
      'A few years ago I should have died. My heart almost failed. Weeks later, RAab Stevenson (of Justin Timberlake, Rihanna, SZA, Chris Stapleton, Doja Cat) discovered my music and over night I was on a flight to L.A. I went from being a broke kid working 80-100 hrs/wk for years living in my buddy’s apartment and making music - to giving up a life changing corporate offer just to risk it all again. Fast forward a few years and I’ve gone viral, turned down $1M record deals, and have 10M plays by myself!',
    ],
    socials: [
      { label: 'Amazon Music', url: 'https://music.amazon.com/artists/B07DM6SNMR/' },
      { label: 'Apple Music', url: 'https://music.apple.com/us/artist/maxwell-aden/1396522231' },
      { label: 'YouTube Music', url: 'https://music.youtube.com/channel/UCjJJfflJHaZo0N_-8xST6Xg' },
      { label: 'Spotify', url: 'https://open.spotify.com/artist/7nIEOplu7MsUD4gdhcRBBj?si=1sPZx-xtTNq1jBEyILQ-pw' },
      { label: 'X', url: 'https://twitter.com/iammaxwelladen' },
      { label: 'Instagram', url: 'https://www.instagram.com/maxwelladen' },
      { label: 'YouTube', url: 'https://www.youtube.com/@maxwelladenvevo4742/videos' },
    ],
  },
  {
    slug: 'mr-darius',
    name: 'Mr. Darius',
    category: 'Musician',
    website: 'https://mrdariusmusic.com/home',
    photo: '/members/mr-darius.png',
    bio: [
      'Just when you have him coined as an artist of inspiration with a fine appreciation for greatness, he compliments you in your intuitive observation commemorating the greatness that resides within us all.Consider the peaceful progressions of “Afterlife” or “They Made History” by Bliss with the gravitational impact of Enigma’s “Return To Innocence” all driven behind the power & purpose of such elevated works from the likes of DJ Krush, Cantoma, Nightmares on Wax, and The Cinematic Orchestra to name a few;we arrive home in salvation granting praise to all that is.',
      'Genre Influences:Electronic, Trap, Bass, Hip Hop, Trip Hop, Downtempo, Wave, Chill, Jazz, Future Beats, Experimental, Instrumental, Lounge, Soul, GodSome Fav Listens:• Lisa Gerrard & Pieter Bourke: See The Sun• Jhené Aiko: Surrender (feat. Dr. Chill)• Tinashe: Ecstasy (Slowed)• Sven Van Hees: Tabla Rasa• Quantic: Archipelago• DJ Cam: Underground Vibes• Flying Lotus: Getting There (feat. Niki Randa)',
      'What Inspires You?:Peace, consciousness, & divine energy."The act of creation itself can be quite inspirational in and of itself”. ~Mr. DariusThe highly anticipated releases of Mr. Darius are now and forthcoming as we openly welcome his profound visionary contributions to the world as it shall be. Blessings ♪',
    ],
    socials: [
      { label: 'Amazon Music', url: 'https://music.amazon.com/artists/B099FJFQXD/mr-darius' },
      { label: 'Apple Music', url: 'https://music.apple.com/us/artist/mr-darius/1576522851' },
      { label: 'Spotify', url: 'https://open.spotify.com/artist/3zXy9QS3GpoMQPVLPbuqtb' },
      { label: 'Instagram', url: 'https://www.instagram.com/mrdariusmusic' },
      { label: 'TikTok', url: 'https://www.tiktok.com/@mrdariusmusic?lang=en' },
      { label: 'YouTube', url: 'https://www.youtube.com/channel/UCaH-0mCkTXh8rKbIapcat4A' },
      { label: 'X', url: 'https://x.com/mrdariusone' },
    ],
  },
  {
    slug: 'nessytherilla',
    name: 'NessytheRilla',
    category: 'Musician',
    website: 'http://op3nminds.XYZ',
    photo: '/members/nessytherilla.png',
    bio: [
      'Born and raised in Detroit, Michigan, Ne$$y began writing raps at the age of 8 and started making music at 15. As a part of Poetic Gorilla Music, Ne$$y, along with the others in the collective, sought to provide opportunities for others to achieve their goals. Not just making hip hop songs, Ne$$y attributes one his influences to being raised in a faith-based family where he spent a lot of time at church and in the choir room learning different ways of singing and taking in the notes. He’s opened up for mainstream artists 6ix9ine, Chief Keef, DojaCat, Obie Trice, D12, Young Jeezy and more!Now that he’s joined web3, Ne$$y has launched a vast catalog of singles as well as collections, both independently and as collaborations with other web3 musicians. Getting his start as creating “theme songs” for NFT projects has given him the ability to grow a community from the ground up. Nessy has been traveling to multiple NFT conferences across the country performing, including Art Basel ’22/’23, NFT LA ’23 and headlining with Styles P at the Gramercy Theater for NFT NYC 23. His most notable songs thus far include the “Metagirl Remix” w/ Sammy Arriaga,  “The Bull Song”, as well as “Sleepless in Seattle”; the rarest song of his latest music NFT project, OP3N MINDS.',
    ],
    socials: [
      { label: 'Apple Music', url: 'https://music.apple.com/us/artist/nessy-the-rilla/1385346924' },
      { label: 'YouTube Music', url: 'https://music.youtube.com/channel/UChDrR4Leeva6AoRxcVK3MEQ' },
      { label: 'Spotify', url: 'https://open.spotify.com/artist/7hqCuQulEdCMUye8L2TYX4?si=mZqxS0DVR96LL-rTVcK10g' },
      { label: 'Instagram', url: 'https://www.instagram.com/nessytherilla/?hl=en' },
      { label: 'TikTok', url: 'https://www.tiktok.com/@nessytherilla?lang=en' },
      { label: 'YouTube', url: 'https://www.youtube.com/channel/UCv2Ks5HH5a0ag_JDFi_ts4g' },
    ],
  },
  {
    slug: 'phantom-mode',
    name: 'Phantom Mode',
    category: null,
    website: null,
    photo: '/members/phantom-mode.png',
    bio: [
      'Phantom mode is an electronic duo comprised of two members, phantom and vengeance.',
      'These two classically trained musicians, have embraced the electronic genre and continue to explore the different genres of electronic music.',
      'Music is very powerful and can be used to spread Goodwill in the hearts of people.',
    ],
    socials: [],
  },
  {
    slug: 'pr0f-t',
    name: 'PR0F!T',
    category: 'Musician',
    website: 'https://prophetoverprofits.univer.se/legacy',
    photo: '/members/pr0f-t.png',
    bio: [
      'PR0F!T is a multi-faceted hiphop artist well versed in spoken word, battle rap, music production, sound engineering, and obviously song writing.',
      'His goal is to transparently share his story of overcoming numerous obstacles to continue following his dreams, finding himself, staying true, and honest to who he is.',
    ],
    socials: [
      { label: 'amazon.com', url: 'https://amazon.com/music/player/artists/B0BZKG2RKX/pr0f-t?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_8Vj9vLCSUprq3teMujm2hW0YX' },
      { label: 'Apple Music', url: 'https://music.apple.com/us/artist/pr0f-t/1678899404' },
      { label: 'YouTube Music', url: 'https://music.youtube.com/channel/UCT1oqDZir9G_I0ODBEoVJaA' },
      { label: 'Spotify', url: 'https://open.spotify.com/artist/3AonMoMGgONwANuv7Hoqhn?si=xbk896yMTNuoHokSryXZ5w' },
      { label: 'Instagram', url: 'https://www.instagram.com/profitvsprophet/' },
    ],
  },
  {
    slug: 'smoke-wavy',
    name: 'Smoke Wavy',
    category: 'Musician',
    website: 'http://zaomusic.xyz',
    photo: '/members/smoke-wavy.png',
    bio: [
      'SMOKE WAVY is an emerging hip hop artist out of New York rapping wit a gritty, psychedelic style that draws inspiration from the grime of the city and the lifestyle that comes with it.',
      '‍',
    ],
    socials: [
      { label: 'X', url: 'https://twitter.com/smoke_wavy' },
      { label: 'Instagram', url: 'https://www.instagram.com/smoke_wavy/' },
    ],
  },
  {
    slug: 'songs-of-eden',
    name: 'Songs of Eden',
    category: 'Musician',
    website: 'http://songsofedenmusic.com',
    photo: '/members/songs-of-eden.png',
    bio: [
      'Swedish Multi-Platinum Music Producer & Pianist',
      'Songs of Eden is a Swedish multi-platinum music producer and pianist whose work transcends genre, language, and borders. With a signature style rooted in emotional resonance and sonic serenity, he creates music that uplifts the spirit and frees the mind. His compositions are more than sound—they are an invitation to pause, breathe, and feel.',
      'After years of charting globally as a songwriter for other artists, Songs of Eden chose to follow his own creative path. Now, under his own name, he blends heartfelt piano with ethereal production to deliver music designed for healing, joy, and well-being.',
      'Whether you\'re seeking peace, purpose, or simply a moment of beauty, Songs of Eden offers a soundtrack for the soul.',
    ],
    socials: [
      { label: 'Apple Music', url: 'https://music.apple.com/us/artist/songs-of-eden/1377074572' },
      { label: 'Spotify', url: 'https://open.spotify.com/artist/65FgZ9ojgAbjhpXy8fL6vt?si=a5l4lxUJTQOCPahAUOd4DA&nd=1&dlsi=e041b3acd5254c09' },
      { label: 'Instagram', url: 'https://www.instagram.com/songsofeden/' },
      { label: 'YouTube', url: 'https://www.youtube.com/songsofedenMusic' },
      { label: 'X', url: 'https://x.com/SongsOfEden' },
    ],
  },
  {
    slug: 'stilo',
    name: 'Stilo',
    category: 'Musician',
    website: 'http://stilo.world/',
    photo: '/members/stilo.png',
    bio: [],
    socials: [],
  },
  {
    slug: 'tabby',
    name: 'Tabby',
    category: 'Songwriter, Musician',
    website: null,
    photo: '/members/tabby.png',
    bio: [
      'Tabby is a singer and songwriter whose music explores emotion, vulnerability, and healing.',
      'Drawing inspiration from artists like Adele, Tems, Sam Smith, and John Legend, she blends pop and R&B influences into a sound that feels both soulful and uniquely her own turning real feelings into songs that connect deeply with listeners.',
    ],
    socials: [
      { label: 'Spotify', url: 'https://open.spotify.com/artist/79iM2qY3vQ8dMhPRkcFoG8?si=KPl1Fyz-Sb-8tHTRTiAjXw&nd=1&dlsi=7f477ada2f6b455e' },
      { label: 'X', url: 'https://x.com/Tabbyomodudu' },
    ],
  },
  {
    slug: 'tej',
    name: 'Tej',
    category: 'Musician',
    website: null,
    photo: '/members/tej.png',
    bio: [
      'Hey folks!',
      'I\'m Tej, your friendly neighborhood pop music fanatic turned full-on music creator from India.',
      'It all started when I watched Charlie Puth break down "Attention", and bam! I knew I had to switch gears and pursue my passion.',
      'From heartfelt lyrics to catchy melodies, I do it all – writing, producing, mixing, you name it!',
      'Yeah, not everyone was on board with my college dropout-and-make-music move, but hey, I\'m living proof it was the right call.',
      'Now, I\'m living the dream, inspiring others to chase theirs, all while diving deep into the wild world of web3 and NFTs.',
      'Oh, and I love entrepreneurship. It\'s my second biggest passion.',
      'Building communities and creating connections – it\'s all part of the journey.',
      'Putting all of it together, I hope I can make the impact that I always wanted to',
    ],
    socials: [
      { label: 'X', url: 'https://twitter.com/tej_music_' },
    ],
  },
  {
    slug: 'the-gx-universe',
    name: 'The GX Universe',
    category: 'Musician',
    website: null,
    photo: '/members/the-gx-universe.png',
    bio: [
      'GX, is an American producer, songwriter, director, and animator. He began his career in 2018, filming interviews for major radio stations such as NYC’s Hot 97. In 2021, he founded ‘The GX Universe’, an independent, multimedia studio redefining what it means to be an independent artist today. Since then he’s garnered thousands of fans, supporters, and listeners by combining music, cinematic visuals/animation, and AR/VR technology to create immersive experiences. GX is raising the bar and pushing the boundaries as he reshapes how we think of and consume media by creating a universe with his content.',
    ],
    socials: [
      { label: 'Amazon Music', url: 'https://music.amazon.com/artists/B08WHQZDM9/the-gx-universe' },
      { label: 'Apple Music', url: 'https://music.apple.com/us/artist/the-gx-universe/1553412646' },
      { label: 'YouTube Music', url: 'https://music.youtube.com/channel/UCK_8OJbWnwqErSlEIWfs5NQ' },
      { label: 'Spotify', url: 'https://open.spotify.com/artist/3P6UVgsH4J49eO2asHRvpg?si=tmGmS6WDRoiTAC61Slm9ZQ' },
      { label: 'X', url: 'https://twitter.com/thegxuniverse' },
      { label: 'Instagram', url: 'https://www.instagram.com/thegxuniverse/' },
      { label: 'TikTok', url: 'https://www.tiktok.com/@thegxuniverse?lang=en' },
      { label: 'YouTube', url: 'https://www.youtube.com/@TheGxUniverse' },
    ],
  },
  {
    slug: 'timi-wale-lomo',
    name: 'Timi Wale Lomo',
    category: 'Producer, Songwriter, PerformingArtist',
    website: 'https://www.facebook.com/profile.php?id=100086760753082&mibextid=LQQJ4d',
    photo: '/members/timi-wale-lomo.png',
    bio: [
      'Babatunde Bello who is popularly known by his stage name Timi Wale Lomo,was born on 31st May 2000 to the family of Mr and Mrs Bello.He is an Ogun state indigent,but based in Kaduna,were he is most famous.His mother Mrs Kemi Ayeni hails from Kogi state,she is a trader and businesswoman.The singer stated that his family is his biggest motivation.His dad Mr Bello is from Ogun state,he is a civil servant and Uber driverHe is the first child in the family of 5.He has lived all his life in Kaduna state,including his primary and secondary education.Timi Wale Lomo started making music at a very tender age,by performing at occasions and events. He is very talented and gifted,a singer that can bump on any beat given to him,which earns him the nickname Afroboy.He has a good number of songs to his credit, with the most prominent of them being his 2020 hit song which he titled’Kaduna’.Some of his song releases include, Angelina,Kaduna,dance,Marlians boyz,omotena,Ololufe mi,amongst other unreleased project.The talented young singer is very good in singing switching between the Yoruba language with the English language.His talent and musical prowess speaks for him through his songs.The ‘Kaduna’ crooner is working on his upcoming Extended project EP,which is expected to be released',
    ],
    socials: [
      { label: 'Instagram', url: 'https://www.instagram.com/timi_wale_lomo?utm_source=qr' },
    ],
  },
  {
    slug: 'zadan',
    name: 'ZADAN',
    category: 'Singer, Songwriter, and Musician',
    website: 'https://zadan.xyz/',
    photo: '/members/zadan.png',
    bio: [
      'ZADAN is a 28 year old Singer-Songwriter and Musician, proficient in the piano, guitar, saxophone, trumpet, drums, bass guitar, and various other instruments.',
      'He has performed all across the country since he was 13 years old; changing hearts and minds with every single impactful lyric geared toward paving the way for peace in the broken lives that people hold with their trauma and inadequacies.',
      'Every action he has ever taken; whether it be building websites, developing smart contracts, shooting and editing photography and videography for companies and clients all around the country, etc. has been for the distinct purpose of taking steps closer and closer to the fruition of his artistic career.',
      'He shines as a live musician at his core bringing the sounds and experiences of his performances to the booth.',
    ],
    socials: [
      { label: 'X', url: 'https://twitter.com/ZADANxyz' },
      { label: 'Instagram', url: 'https://www.instagram.com/zadanxyz/' },
      { label: 'TikTok', url: 'https://www.tiktok.com/@zadanxyz?lang=en' },
    ],
  },
]

export function getMember(slug: string) {
  return WEBFLOW_MEMBERS.find((m) => m.slug === slug)
}

// --- Artist categories -------------------------------------------------------
// The Webflow site had a page per artist category at /artist-category/<slug>.
// Those URLs are live today and would 404 after the DNS switch, so they are
// rebuilt here. The slugs below are derived from the category text by the same
// rule Webflow used, and they reproduce its six slugs exactly.
//
// The rebuild is deliberately better than the original: Webflow's category pages
// rendered a truncated collection list (its /artist-category/musician showed 4 of
// the 36 musicians). These list every member in the category.

export function categorySlug(category: string): string {
  return category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export type ArtistCategory = { slug: string; name: string; members: WebflowMember[] }

export const ARTIST_CATEGORIES: ArtistCategory[] = (() => {
  const bySlug = new Map<string, ArtistCategory>()
  for (const m of WEBFLOW_MEMBERS) {
    if (!m.category) continue // makk-jay and phantom-mode have no category in the source
    const slug = categorySlug(m.category)
    const existing = bySlug.get(slug)
    if (existing) existing.members.push(m)
    else bySlug.set(slug, { slug, name: m.category, members: [m] })
  }
  return [...bySlug.values()].sort((a, b) => b.members.length - a.members.length)
})()

export function getCategory(slug: string) {
  return ARTIST_CATEGORIES.find((c) => c.slug === slug)
}
