import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import QuestionPanel from "./questionPanel";
import AnserPanel from "./answerPanel";
import { useAtomValue } from "jotai";
import { currentSectionAtom, questionAtom } from "@/atom/atom";

export default function LeftPanel() {
  const questionInfo = useAtomValue(questionAtom);
  const currentSection = useAtomValue(currentSectionAtom);
  return <div>
    <PanelGroup direction="horizontal">
      <Panel defaultSize={50}>
        {questionInfo.question.map(x => {
          if (x.type == currentSection) {
            return <QuestionPanel question={x.question} />
          }
        })}
      </Panel>
      <PanelResizeHandle className="w-2 h-full bg-slate-300" />
      <Panel defaultSize={50}>
        {questionInfo.question.map(x => {
          if (x.type == currentSection) {
            return <AnserPanel words={x.words} />
          }
        })}
      </Panel>
    </PanelGroup>
  </div>
}
