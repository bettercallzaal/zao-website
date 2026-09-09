// Jango UU's release archive, carried over from the Webflow build of thezao.com.
//
// WHY THIS FILE EXISTS. These 17 pages were live on Webflow but linked from
// nothing on that site - they were found through the Wayback index, not by
// crawling. Until now they redirected to /community/jango-uu, which kept the URLs
// alive but dropped the writing: the profile page carries none of these release
// titles, and the OLD Webflow profile linked to /drops/ zero times either, so
// there was nowhere to port them back from. Cancelling the Webflow plan would have
// left the only copy of this text in a local archive on one disk.
//
// Text is the source's own words, not rewritten. Cover images were taken from the
// verified archive and are served from /public/drops, NOT from Webflow's CDN -
// the whole site references website-files.com zero times across all 68 routes,
// and porting these by URL would have reintroduced exactly the dependency that
// cancelling breaks.
//
// Two covers use Webflow's own -p-1080 variant rather than the original: SOTC9 was
// 2.6 MB and sunrider 2.3 MB, against a member-photo convention of 152 KB at the
// largest. Between them they were most of an 8.3 MB payload on a 3.5 MB baseline.
// The full-resolution originals stay in the archive, which is where they belong -
// the site does not need them to render a square cover.
//
// GAPS BELOW ARE GAPS IN THE SOURCE, not extraction failures, each verified:
//   dual-wield                            no category - Webflow's own
//                                         w-dyn-bind-empty marker, href="#"
//   dual-wield                            Listen buttons present, no hrefs behind
//                                         them (empty CMS fields)
//   djangos-first-music-video-gucci-shit  no body text - 0 <p> tags; a video entry
//                                         that never had a writeup
//
// LINK AUDIT 2026-09-08: all 18 outbound release links returned 200, with
// controls on each host in the same run (a known-good Spotify album, Apple Music
// album and YouTube video all 200) so a pass is not just the host being friendly.
// One YouTube href carried a literal "&amp;" in the Webflow source; it is
// unescaped here.

export type WebflowDrop = {
  slug: string
  title: string
  /** As written on the Webflow page, e.g. "June 19, 2020". */
  date: string
  /** Single, EP, Album, 3 Track, Video. Empty where the source had none. */
  category: string
  /** Path under /public/drops. Two drops share one cover - the Gucci Shit single
   *  and its music video used the same artwork on Webflow. */
  cover: string
  /** Paragraphs, in source order. Empty for the one entry with no writeup. */
  body: string[]
  links: { platform: string; url: string }[]
}

export const WEBFLOW_DROPS: WebflowDrop[] = [
  {
    slug: "sunrider",
    title: "SUNRIDER",
    date: "January 31, 2024",
    category: "Single",
    cover: "/drops/649692e084fd981c08d16c27_65a0dbc751eb4bac6ef90383_sunrider-p-1080.png",
    body: [
      "With car revs, choral hymnal -esque hums, and a straight ballistic beat, SUNRIDER marks Jango UU’s first release in 2024 on digital streaming platforms. It was originally written on Jango’s 23rd birthday, in April 2022. The song went through several re-iterations before the final version was created in mid-2023. Lyrically, SUNRIDER coasts throught themes of freedom, letting go of what others think, ignoring societal norms, and living your truth as you can, with a few ridiculous lines here and there for the entertainment factor.",
    ],
    links: [
      { platform: "Spotify", url: "https://open.spotify.com/track/7AzgRsD3jerEXLvlfhJx9h" },
    ],
  },
  {
    slug: "dual-wield",
    title: "DUAL WIELD",
    date: "January 8, 2024",
    category: "",
    cover: "/drops/649692e084fd981c08d16c27_65a0dbceee7c9a6a39738b39_Dual-Wield.jpg",
    body: [
      "Jan 8th 2024 marked Jango UU’s first foray into Web3 with the release of his new music NFT for his single DUAL WIELD!!!! Created on SoundXYZ, the single features production by Dutch producer Sapjer, who Jango has been working with over the years. DUAL WIELD’s explosive presence only serves as foreshadowing for Jango UU’s takeover in the Web3 realm. Be on the lookout for new drops by him!",
    ],
    links: [],
  },
  {
    slug: "ragepop-reimagined",
    title: "RAGEPOP REIMAGINED",
    date: "August 9, 2023",
    category: "EP",
    cover: "/drops/649692e084fd981c08d16c27_659f4e572f70d81822a4f82c_unnamed.jpg",
    body: [
      "In 2021, Jango UU set out to create his next set of singles with superstar producers Sonickaboom & Ultrasonic.",
      "This ended up spurring the creation of his first EP, RAGEPOP, released on July 27th, 2021. While met with praise from his fans, it was Jango UU who was ultimately unhappy with the project.",
      "Fast forward two years, and Jango UU had done the unthinkable, re-release his old EP, under the pretenses of a reinvention.",
      "Titled RAGEPOP REIMAGINED, it’s a blend of hip-hop, rock, pop, and electronic music, just like the former, but its main difference other than rewritten songs are the meticulously crafted sonics that culminate into an explosive rollercoaster of a project. Here, we can hear Jango truly come into his own as a mixing engineer.",
    ],
    links: [
      { platform: "Spotify", url: "https://open.spotify.com/album/3MYQVA6yM5sobOLq7Ift0Q?si=yVp-09TRT-CLNWyPAOEa2w" },
      { platform: "Apple Music", url: "https://music.apple.com/us/album/ragepop-reimagined-ep/1695163200" },
    ],
  },
  {
    slug: "south-of-the-city",
    title: "SOUTH OF THE CITY",
    date: "July 12, 2023",
    category: "Single",
    cover: "/drops/649692e084fd981c08d16c27_64b4c01e628788be454618e7_SOTC9-p-1080.jpg",
    body: [
      "On July 12th 2023, Jango UU treated fans to the re-release of his single \"SOUTH OF THE CITY.\" Originally featured on his 2021 EP \"RAGEPOP,\" this updated version showcases Jango's growth as an artist, evident in his enhanced storytelling abilities, mesmerizing vocal layering, and massively improved production and mixing techniques.",
      "‍",
      "\"SOUTH OF THE CITY\" weaves an alluring tale of a clandestine love affair, shrouded in glittery sonics and delivered through Jango's rollercoaster-like flows. The track's enveloping sound draws listeners into Jango UU's world, immersing them from beginning to end. The re-release of \"SOUTH OF THE CITY\" received a co-sign from 730Skylar, the engineer behind the rising R&B star Morgan Gold, further solidifying its quality and appeal.",
      "‍",
      "The record features production from the talented team of Wesdorp, Subi K, JKIMBEATS, and Jango UU himself, resulting in a cohesive and mesmerizing sonic experience. Fans instantly fell in love with the reimagined version of \"SOUTH OF THE CITY,\" eagerly anticipating Jango UU's upcoming re-release of the entire \"RAGEPOP\" EP, aptly titled \"RAGEPOP REIMAGINED.\"",
      "‍",
      "The reception for \"SOUTH OF THE CITY\" was overwhelmingly positive, with fans praising Jango UU's artistic growth and the song's enthralling sound. This re-release serves as a testament to Jango's dedication to his craft and his commitment to continually improving his musical abilities. As fans eagerly await the full \"RAGEPOP REIMAGINED\" project, it's clear that Jango UU is ready to make his mark on the music scene with his unique and captivating sound.",
      "‍",
    ],
    links: [
      { platform: "Spotify", url: "https://open.spotify.com/album/6U4sJychWNWuL7v1biniuR?si=BU0XaliRQ_-D7zvX4dK48Q" },
      { platform: "Apple Music", url: "https://music.apple.com/us/album/south-of-the-city-single/1693815327" },
    ],
  },
  {
    slug: "djangos-12th-release-talkin-fly",
    title: "TALKIN' FLY",
    date: "May 29, 2023",
    category: "Single",
    cover: "/drops/649692e084fd981c08d16c27_649e78d9dff1a5cd271316aa_talkfly.jpg",
    body: [
      "In late May 2023, Jango UU gifted his fans with the release of \"TALKIN' FLY.\"",
      "This record illustrates Jango's infectious flows and melodic prowess, all set against a hyperpop-inspired trap production crafted by the talented Chase Monica. Lyrically, \"TALKIN' FLY\" is a testament to Jango's punchlines, as he cleverly references everything from supersized orders at McDonald's, to future successes, to his love for the popular game Super Smash Brothers.",
      "The mix cleverly juxtaposes soothing and ambient vocal sounds with more aggressive rap textures, capturing the multifaceted nature of Jango UU's artistry.",
      "The cover art, designed by Emily Irving, serves as a visual representation of Jango's growth as both an artist and a mix engineer.",
      "With \"TALKIN' FLY,\" Jango UU once again proves his ability to captivate listeners with his unique sound and lyrical finesse, leaving fans excited for what the future holds for this rising star in the music industry.",
      "‍",
    ],
    links: [
      { platform: "Spotify", url: "https://open.spotify.com/album/2ZKKq9CcLESq0Igf37Xkne?si=0zjB0WoSSMy3nYY17zpbkA" },
    ],
  },
  {
    slug: "djangos-11th-release-game-in-2023",
    title: "GAME IN 2023",
    date: "March 29, 2023",
    category: "EP",
    cover: "/drops/649692e084fd981c08d16c27_649e78c636ff5216d2c3cf86_gamein.png",
    body: [
      "Jango UU released a double single titled \"GAME IN 2023\" on March 29th, 2023.",
      "The double single featured the tracks \"THE DAMN PRINCIPLE\" and \"REAL PLAYAS.",
      "Inspired by the book \"Nice Guys & Players\" by Rom Wills, these tracks showcased Jango's growth as an artist, offering thought-provoking lyrics and captivating electronic production.",
      "\"THE DAMN PRINCIPLE” is a blunt yet witty track about courting women in a not so gentlemanly fashion.",
      "However, through Jango's charisma, energetic delivery, and flows that keep you on the edge, what would otherwise come off as disrespectful, ends up being hilarious and one hell of a banger, all without a single instance of a chorus.",
      "In comparison, the second track REAL PLAYAS, is a perfect juxtaposition, having three distinct choruses, as well as being a much more mid tempo.",
      "REAL PLAYAS touches on the struggles of finding a romantic partner.",
      "The dual singles were produced by famed Dutch electronic artist Sapjer (known for his work with midwxst, BIGBABYGUCCI, and Ramiro), who Jango started collaborating with in early 2022.",
      "This marked the first of many releases between the duo, and one can only imagine what they have in the future for fans.",
      "‍",
      "Highlight Tracks: THE DAMN PRINCIPLE, REAL PLAYAS",
      "‍",
    ],
    links: [
      { platform: "Spotify", url: "https://open.spotify.com/album/3UIy7hv9gEykT6un8LS4qe?si=ytxa6aPHR_erYz1Ub8SU0Q" },
    ],
  },
  {
    slug: "djangos-10th-release-never-been-the-same-since",
    title: "NEVER BEEN THE SAME SINCE",
    date: "February 22, 2023",
    category: "Single",
    cover: "/drops/649692e084fd981c08d16c27_649e78b14e2a9b5b23df737d_nbtss.png",
    body: [
      "After a personal hiatus, Jango UU returns on February 22nd, 2023, with a reimagined version of his favorite song from his 2022 EP, “LET THEM HOES ROCK”.",
      "\"NEVER BEEN THE SAME SINCE\" demonstrates Jango's versatility as he merges alternative R&B and rap elements over a Clams Casino-esque production.",
      "The track was meticulously crafted, recorded at Platinum Studios with esteemed mix engineer Serge Tsai, and supported by a music video directed by Will Ryan III and Jango UU himself.",
      "With additional production from longtime collaborator Raavi, this collaboration marked a new artistic chapter for Jango, further elevating his dedication to his craft.",
      "‍",
    ],
    links: [
      { platform: "Spotify", url: "https://open.spotify.com/album/4uUMFbHpEGeZih4xNK6Nrb?si=-w40zHN7SueVvorXXsdh5g" },
    ],
  },
  {
    slug: "djangos-9th-release-bezos",
    title: "BEZOS",
    date: "May 19, 2022",
    category: "Single",
    cover: "/drops/649692e084fd981c08d16c27_649e78a6056863b9b4192ca3_bezos.png",
    body: [
      "Collaboration continues to play a significant role in Jango UU's musical journey, as seen in his release \"BEZOS\" on May 19th, 2022.",
      "Featuring St. Louis rapper and producer Andrew Kelly, \"BEZOS\" combines elements of Jango's previous hits, \"Gucci Shit\" and \"Wide Awake,\" with Raavi's sample-based funk and hip-hop production.",
      "The result is a hilariously metaphoric track, with both artists trading catchy melodic verses that enthralled listeners.",
      "The cover was created by Abby Van Camp, a longtime friend and artistic collaborator of Jango’s and perfectly encapsulates the hysteria of the record.",
      "‍",
    ],
    links: [
      { platform: "Spotify", url: "https://open.spotify.com/album/4JM69iraOigN9RI972BzFt?si=-xNmMY2CQjSJtO6S8DCkNw" },
    ],
  },
  {
    slug: "djangos-8th-release-want-it-like-me-",
    title: "WANT IT LIKE ME",
    date: "April 4, 2022",
    category: "Single",
    cover: "/drops/649692e084fd981c08d16c27_649e789c864503a6352aef71_want-it-like-me.png",
    body: [
      "Continuing his genre exploration, Jango UU ventures into the realm of soul music with his track \"WANT IT LIKE ME,\" released on April 4th, 2022.",
      "Over a beautiful soul beat produced by SnazzBeats, Jango delivers his most inspirational lyrics yet, creating an empowering and gorgeously produced track that resonates with listeners.",
      "‍",
    ],
    links: [
      { platform: "Spotify", url: "https://open.spotify.com/album/3g6z2uvKSWlrKukXKzsjEp?si=WDNa5VkmTjOjHZ6W-qnYaw" },
    ],
  },
  {
    slug: "djangos-7th-release-let-them-hoes-rock",
    title: "Let Them Hoes Rock",
    date: "February 22, 2022",
    category: "EP",
    cover: "/drops/649692e084fd981c08d16c27_649e7883fe9c5382e557359e_letem.png",
    body: [
      "Following the success of \"RAGEPOP,\" Jango UU took a hiatus to refine his skills as a mix engineer and vocalist.",
      "A summer and Fall of heartbreak, depression cycles, self reflection, and the sudden blowup of the online phenomenon known as The Manosphere, spurred a reflection period that spawned the creation of Jango UU's second EP, \"LET THEM HOES ROCK,\" released on February 22nd, 2022.",
      "\"LET THEM HOES ROCK\" exhibits Jango's continued genre experimentation, incorporating elements of alternative R&B, synth-pop, lo-fi hip hop, and cloud rap to create a dark and brooding sound.",
      "“CURED AILMENTS”, the highlight of the project, is a lovely concoction of enchanting vocal performances, combined with woozy, pumping synth basses and a somber piano melody.",
      "It then switches to a bouncy trap beat with some mid tempo flows, before breaking out with lead synths signaling more energetic, almost celebratory sounding deliveries and cadences.",
      "Jango's vocal performances on this project are exceptional, showcasing his phenomenal four-octave range and utilizing special vocal effects to amplify emotional impact.",
      "The cover is a collage of elements, created by Abby Van Camp, a longtime friend of Jango’s.",
      "The cover immaculately captures the introspective yet overwhelmed voice that Jango takes on in the project, and has been heralded by many to be his most exemplary cover.",
      "Co-produced by Jango UU himself, along with Raavi, Steph Connolly, and new collaborator JKIMBEATS, \"LET THEM HOES ROCK\" displays Jango's immense creativity and marks his most inventive project to date.",
      "‍",
      "Highlight Tracks: CURED AILMENTS, NEVER BEEN THE SAME SINCE, DECEMBER 35TH",
      "‍",
    ],
    links: [
      { platform: "Spotify", url: "https://open.spotify.com/album/1ab2Nabx0owCEzEWoQnpp8?si=ivLIH44BRmavWp0MXnaVDQ" },
    ],
  },
  {
    slug: "djangos-6th-release-and-first-album-ragepop",
    title: "Ragepop",
    date: "July 27, 2021",
    category: "Album",
    cover: "/drops/649692e084fd981c08d16c27_649e785f10258256d1a106b0_RagePOP.JPG",
    body: [
      "Building on the success of his previous releases, Jango UU unleashes his debut EP, \"RAGEPOP,\" on July 27th, 2021.",
      "The extended play features six tracks, produced by a range of talented producers.",
      "Such producers include Sonickaboom (known for his work with Chief Keef, Lil Uzi Vert, Gucci Mane, and SoFaygo), Ultrasonic (Sonickaboom’s childhood friend and co-producer), Steph Connolly, Chase Monica, Subi K, and Jango UU himself.",
      "\"RAGEPOP\" illustrates Jango's diverse taste in music while maintaining a cohesive sound throughout the project.",
      "The cover was painted by long-time friend Logan Scott Dunn, a notable top professional Super Smash Brothers Melee player who was formerly ranked top 50 worldwide.",
      "With coverage from esteemed music blog 108Mics, as well as a release party and two free concerts celebrating the project, the EP garnered nearly 20,000 streams on YouTube, over 10,000 on Spotify, and was marked as a return to form, becoming Jango UU's most successful release to date.",
      "Highlight Tracks: SOUTH OF THE CITY, ONGOD, NEIL",
      "‍",
    ],
    links: [
      { platform: "Spotify", url: "https://open.spotify.com/album/6UMrfErV5uwkj3Zpf9E2nA?si=uP89A3lcT3m5GgMq-_h0Mw" },
    ],
  },
  {
    slug: "djangos-5th-release-your-perception-my-reality",
    title: "Your Perception, My Reality",
    date: "January 28, 2021",
    category: "3 Track",
    cover: "/drops/649692e084fd981c08d16c27_649e7791a37a893333ba4e73_yourp.png",
    body: [
      "Fans eagerly awaited Jango UU's next move after the success of \"GUCCI SHIT.\"",
      "Their anticipation was rewarded on January 28th, 2021, when Jango UU released \"YOUR PERCEPTION, MY REALITY.\"",
      "This project marked a significant shift in Jango's style, delving into a darker and more introspective sound.",
      "Collaborating with producers Chase Monica and Subi K, Jango explored themes of isolation, emotional numbness, and fake friendships.",
      "The standout track, \"samepace,\" showcased Jango's growth as an artist, as he tackled the topic of outgrowing others' efforts.",
      "This project marked a turning point for Jango UU, as he started to experiment with different genres and develop his own unique style, best seen in the second track stonecold.",
      "stonecold showcased Jango & Chase Monica's knack for innovation, being one of the earliest examples of mellow drill production, something that later acts such as fellow New York artist Ice Spice would popularize in the mainstream.",
    ],
    links: [
      { platform: "Spotify", url: "https://open.spotify.com/album/0Nivw4DaqDBJqbdS1AsjYn?si=ZmBzlnFqRY6CvThyKoNsvA" },
    ],
  },
  {
    slug: "djangos-4th-release-gucci-shit",
    title: "Gucci Shit",
    date: "September 18, 2020",
    category: "Single",
    cover: "/drops/649692e084fd981c08d16c27_649e7757bde586a93b1cec7d_guccishi.jpg",
    body: [
      "In the late summer of 2020, Jango UU dropped his first true single, \"GUCCI SHIT\".",
      "The catchy track, produced by his longtime friend Chase Monica, featured a music video directed by Rochester based film crew Lil Stish Productions that quickly gained popularity, accumulating over 10,000 streams in just three months.",
      "Lyrically, Jango flows about designer brands over a dreamy piano beat with incredibly bouncy 808s that are bound to make anyone want to bob their head.",
      "“GUCCI SHIT” was supported by a remix, performed by Texas rapper Formerly LEN, released 10 days later.",
      "‍",
    ],
    links: [
      { platform: "Spotify", url: "https://open.spotify.com/album/4AB3ZrtvBYrxaVM0o2dZJp?si=Wee49aJFQZ6pcX7aRNzmAA" },
    ],
  },
  {
    slug: "djangos-first-music-video-gucci-shit",
    title: "Gucci Shit Music Video",
    date: "September 18, 2020",
    category: "Video",
    cover: "/drops/649692e084fd981c08d16c27_649e7757bde586a93b1cec7d_guccishi.jpg",
    body: [],
    links: [
      { platform: "YouTube", url: "https://www.youtube.com/watch?v=s_IdTtb3Y_E&ab_channel=Outfit14A" },
    ],
  },
  {
    slug: "djangos-3rd-release-alice",
    title: "Alice",
    date: "June 19, 2020",
    category: "3 Track",
    cover: "/drops/649692e084fd981c08d16c27_649e77245021b849d3ed9487_unnamed.png",
    body: [
      "As a followup to the single reads n’ replies, ALICE was released two weeks later, on June 19th, 2020.",
      "It was produced by Subi K & Steph Connolly, and mixed entirely by Jango UU himself, being the first project to debut his skills as a mix engineer.",
      "\"ALICE\" showcased Jango's growth as an artist, as his vocal style took on a more aggressive tone, particularly evident in the track \"DEMISE.\"",
      "The project garnered over 10,000 streams within the first six months and received praise from DyloPillow, music reviewer and manager of DMV rap star Armani Jordan, on YouTube.",
      "Highlights: DEMISE",
    ],
    links: [
      { platform: "Spotify", url: "https://open.spotify.com/album/3aaQAB3M4dKp0lCSXSeMej?si=rML9_mKsTW-NQ4_NkiCz5A" },
    ],
  },
  {
    slug: "djangos-second-release-reads-n-replies",
    title: "Reads n' replies",
    date: "June 5, 2020",
    category: "Single",
    cover: "/drops/649692e084fd981c08d16c27_649e770410258256d19f5444_readsn.jpg",
    body: [
      "In the midst of a global lockdown caused by the COVID-19 pandemic, while many people found themselves taking time off work and relaxing, Jango UU was hard at work pursuing his musical passion.",
      "During this period, he dedicated himself to recording and mixing his second 3-track project, titled \"ALICE,\" which was released on June 19th, 2020.",
      "Prior to the project's release, Jango UU unveiled the lead single, \"reads n’ replies,\" on June 5th, 2020.",
      "Lyrically, \"reads n’ replies” delves into the intriguing story of an online relationship with an obsessive woman, exploring the complexities and dynamics of such connections.",
      "Jango UU's lyrics draw listeners into the narrative, painting a vivid picture of this unique and sometimes turbulent nature of such relations.",
      "The cover art for \"reads n’ replies\" is thoughtfully designed by Emily Irving, presenting a visual representation of the single's themes and concepts. The artwork serves as an invitation for listeners to delve into the sonic world created by Jango UU.",
      "Produced by the talented Subi K, \"reads n’ replies\" showcased Jango UU's growth as an artist and his commitment to honing his craft. The record, which was meticulously recorded and mixed during a time of global uncertainty, served as a testament to Jango UU's dedication and creativity.",
    ],
    links: [
      { platform: "Spotify", url: "https://open.spotify.com/album/3YJK2YRvl1UPTYbs4EDDto?si=_QTHl1BATneo_4YmC_89WQ" },
    ],
  },
  {
    slug: "djangos-first-release-wide-awake-3-track",
    title: "WIDE AWAKE 3 Track",
    date: "February 21, 2020",
    category: "3 Track",
    cover: "/drops/649692e084fd981c08d16c27_649e76435a5efebc449ada3d_wideawake.png",
    body: [
      "Jango UU's journey into the music industry begins with a bang on February 20th, 2020, with the release of his debut single, \"WIDE AWAKE.\"",
      "This highly anticipated project features three tracks: the collaborative effort \"DEEP WITHIN\" with NJ punk pop artist Arcuti, the title track \"WIDE AWAKE,\" and the energetic \"RESET.\"",
      "WIDE AWAKE is supported by a release trailer, made by NY artist and designer Emily Irving, as well as a lyric video for RESET.",
      "Produced by Atdenn & Steph Connolly, the project caught the attention of music blog 108Mics, which praised Jango's dynamic vocal performances, relatable lyrics, and impeccable beat selection.",
      "To celebrate the release, Jango UU hosted a release party that drew an impressive crowd of over 400 people at Nashville’s, a college country bar in Rochester.",
      "With over 25,000 streams across all platforms, \"WIDE AWAKE\" solidified Jango UU as one of the rising stars in the upstate New York music scene.",
      "‍",
      "Highlight Tracks: WIDE AWAKE, DEEP WITHIN (feat. Arcuti), RESET",
      "‍",
    ],
    links: [
      { platform: "Spotify", url: "https://open.spotify.com/album/5Tyav9eUZ2ghfd7tXQPMEx?si=rS6ovZhjT0OBLkI07k2M-g" },
    ],
  },
]

export function dropBySlug(slug: string) {
  return WEBFLOW_DROPS.find((d) => d.slug === slug)
}
