import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


export function TableDemo() {
  return (
    <Table className="font-bold">
      <TableHeader>
        <TableRow className="flex items-center justify-center">IBPS PO Mains Descriptive Test 2025</TableRow>
      </TableHeader>
      <TableHeader>
        <TableRow>
          <TableHead>Topics</TableHead>
          <TableHead>No of Questions</TableHead>
          <TableHead>Marks</TableHead> <TableHead>Medium of Exam</TableHead>
          <TableHead>Duration</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            Descriptive
            Paper* (Essay and
            Comprehension)
          </TableCell>
          <TableCell>
            02
          </TableCell>
          <TableCell>
            25
          </TableCell>
          <TableCell>
            English
          </TableCell>
          <TableCell>
            30 minutes
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
