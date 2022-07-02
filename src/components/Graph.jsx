import GraphNode from "./GraphNode"
import { Context } from "../Context"
import { useContext } from "react"

export default function Graph() {
    const {graphData} = useContext(Context)
    const graphNodes = Object.keys(graphData).map(node => {
        return <GraphNode key={node} nodeName = {node}/>
    })
  return (
    <div className="grid grid-flow-col grid-rows-3 auto-cols-fr gap-[3rem]">{graphNodes}</div>
  )
}
