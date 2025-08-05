import Feedback from "../components/feedback"
import Nav from "../components/navBar"
import ShieldBadge from "../components/optionList"
import Test from "../components/test"
import YearBasedSection from "../components/yearBasedSection"

export default function SbiPo() {
  return <div>
    <Nav />
    <div className="max-w-6xl mx-auto flex flex-col gap-y-4">
      <div className="font-semibold text-xl flex justify-start ">SBI PO Mock Test Series</div>
      <p>
        Are you preparing for the SBI PO exam? Guidely's SBI PO Mock Test 2025 Series is here to help you prepare effectively. For your convenience, we offer both sectional and full-length tests to help you improve your speed and accuracy for the real exam. Our SBI PO Mock Test Series Free Online package includes 20 full-length mock tests and 15 sectional tests for SBI PO Prelims 2025, along with 10 full-length mocks and 15 sectional tests for SBI PO Mains 2025. SBI PO is known for being one of the toughest exams, so consistent practice is essential. You can utilize our mock tests, designed with high-quality questions based on the latest exam pattern and marking system. After completing each test, you’ll get a feel for the real exam environment and have the chance to assess your overall performance. Take the SBI PO free mock test to check out the quality of our test series.
      </p>
      <img className="cursor-pointer" onClick={() => {
        window.open("https://guidely.in/mock-test-subscription", "_blcnk")
      }} src="https://guidelyassets.s3.ap-south-1.amazonaws.com/editor/courses/175324612166.png?1753246119015" />
      <YearBasedSection title="SBI PO Prelims 2025" imageUrl="https://cdn.guidely.in/images/courses/161492185581.png" totalTests={35} />
      <Test language="english" questions={40} time={100} />
      <ShieldBadge number={23} />
      <Feedback />
    </div>
  </div>
}
