import { readFileSync } from 'fs'

/**
 * @typedef {Object} Repo
 * @property {string} full_name
 * @property {string} name
 * @property {string} ssh_url
 * @property {'public' | 'private'} visibility
 */

/**@type {Repo[]}*/ const repos = JSON.parse(readFileSync('repos.json', 'utf8'))

const ignore_names = `
tuikit
utest
zsh
nvim
raspberry-pi
redesigned-engine
unzip
lib
paper
log
p
nus-db
astar
draw
blog
minecraft-servers
uni-archive
uni
lonelyplanet
minnesoda
notes
google
upgraded-chainsaw
arch
alacritty
ai
api
qt-static
qt-source
personal
hire
qmk_firmware
canvas-sync-cli
new-stuf
nus-canoe
void
dots
latext
modtree-rust
ripgrep
`
  .trim()
  .split('\n')
/** @type {((v: Repo) => boolean)[]} */ const ignore = [
  (v) => v.visibility === 'private',
  (v) => !v.full_name.startsWith('nguyenvukhang/'),
]
/** @param {Repo} v @returns {boolean} */
const is_ignored = (v) =>
  ignore.some((t) => t(v)) || ignore_names.includes(v.name)

const r = {
  /** @type {Repo[]} */ ignored: [],
  /** @type {Repo[]} */ private: [],
  /** @type {Repo[]} */ display: [],
}

repos.forEach((v) => {
  if (v.visibility === 'private') r.private.push(v)
  else if (is_ignored(v)) r.ignored.push(v)
  else r.display.push(v)
})

// prettier-ignore
const inspect=(t,v)=>console.log(t+'\n',v.map((v)=>v.name).join(", "),v.length)

inspect('PRIVATE', r.private)
inspect('IGNORED', r.ignored)
inspect('DISPLAY', r.display)
