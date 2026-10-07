import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import * as ExternalPlugin from "./.quartz/plugins"

// 카테고리 하위 글 개수 재귀 계산
const countFiles = (node: any): number => {
  if (!node.isFolder) {
    return 1
  }

  return node.children.reduce(
    (sum: number, child: any) => sum + countFiles(child),
    0,
  )
}

ExternalPlugin.Explorer({
  mapFn: (node) => {
    if (node.isFolder) {
      node.displayName = `${node.displayName} (${countFiles(node)})`
    }

    return node
  },
})

const config = await loadQuartzConfig()

export default config
export const layout = await loadQuartzLayout()