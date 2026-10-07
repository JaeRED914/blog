import {
  loadQuartzConfig,
  loadQuartzLayout,
} from "./quartz/plugins/loader/config-loader"

import * as ExternalPlugin from "./.quartz/plugins"


// 폴더 안의 실제 글(.md) 개수를 하위 폴더까지 전부 합산
const countArticles = (node: any): number => {
  if (!node.children) {
    return 0
  }

  return node.children.reduce((total: number, child: any) => {
    if (child.isFolder) {
      return total + countArticles(child)
    }

    return total + 1
  }, 0)
}


// 반드시 loadQuartzConfig()보다 위에 있어야 함
ExternalPlugin.Explorer({
  mapFn: (node) => {
    if (node.isFolder) {
      const count = countArticles(node)
      node.displayName = `${node.displayName} (${count})`
    }

    return node
  },
})


const config = await loadQuartzConfig()

export default config
export const layout = await loadQuartzLayout()