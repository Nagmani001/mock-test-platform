import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import axios from "axios"
import { BASE_URL } from "@/config/utils"

export function DialogDemo() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="secondary">Pause Test</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Do you want to pause the test ?</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">No</Button>
            </DialogClose>
            <Button onClick={async () => {
              try {
                // managing state first 
                await axios.post(`${BASE_URL}/api/v1/test/pause`, {
                  remainingHour: 0,
                  type: "Paused",
                  remainingMinute: 10,
                  remainingSecond: 40,
                  testId: "c431d030-f17d-4397-9d7b-cbb1ab8e06b5",
                  solution: [{
                    questionId: "b310448f-c10f-484e-8c20-cd591efcb564",
                    answer: "this is example essay ",
                    wordsNumber: 100,
                    solutionTimeHour: 0,
                    solutionTimeMinute: 10,
                    solutionTimeSecond: 4,
                    status: "Answered"
                  }]
                });
              } catch (err) {
                console.log(err);
              }
            }}> Yes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
