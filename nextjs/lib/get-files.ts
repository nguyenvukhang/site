import { resolve } from 'path'
import { lstatSync, readdirSync } from 'fs'

/**
 * Gets all files recursively under a specified directory, with an
 * optional ignore list
 */
export const getAllFiles = (root: string, ignore: string[] = []) => {
  const allFiles: string[] = []
  const ls = (cwd: string) => {
    readdirSync(cwd)
      .filter((x) => !ignore.includes(x))
      .forEach((file) => {
        const fp = resolve(cwd, file)
        if (lstatSync(fp).isDirectory()) {
          ls(resolve(cwd, file))
        } else {
          allFiles.push(fp)
        }
      })
  }
  ls(root)
  return allFiles.filter((entry) => entry !== root)
}

/**
 * Gets files in the directory (without recursing)
 */
export const getFiles = (root: string, ignore: string[] = []) =>
  readdirSync(root)
    .filter((x) => !ignore.includes(x))
    .map((file) => resolve(root, file))
    .filter((entry) => entry !== root)
