import { useEffect, useState } from "react";
import Test from "../components/test";
import { BASE_URL } from "../config/utils";
import axios from "axios";
import { TableDemo } from "@/components/table";
import Describe from "@/components/describe";
import Faq from "@/components/faq";
import Rating from "@/components/rating";
import Footer from "@/components/footer";
import Nav from "@/components/nav";

interface Test {
  id: string
  title: string,
  language: string,
  questions: number,
  time: number
}
export default function Tests() {
  const [tests, setTests] = useState<Test[]>([]);
  useEffect(() => {
    const main = async () => {
      const res = await axios.get(`${BASE_URL}/api/v1/test`);
      setTests(res.data.tests);
    }
    main();
  }, [])
  return <div>
    <Nav />
    <div className="max-w-4xl mx-auto mt-20 ">
      <div className="gap-x-2 flex items-center ">
        <img className="h-10 w-10" src="https://cdn.guidely.in/images/courses/163773953873.png" />
        <h1 className="font-bold text-2xl">Descriptive Writing Test For IBPS PO Mains 2025</h1>
      </div>
      <p className="mt-2">Want to ace the Descriptive Writing section of IBPS PO Mains 2025? Get ready with our Descriptive writing Mock Test for IBPS PO Mains 2025. The Descriptive paper in IBPS PO Mains covers essay writing and comprehension. Regular practice of essay writing on different important topics, along with comprehension exercises, will enhance your fast-reading and writing abilities. The total marks for the IBPS PO Descriptive paper are 25. To fetch maximum marks in this section, more practice is required. So, practice regularly using our Descriptive paper for IBPS PO mock test 2025 series. As a result, you can gain excellent typing skills and fast-reading ability. Additionally, it will help you to gain content knowledge of various key essay topics.</p>
      <div className="mt-4">
        <TableDemo />
      </div>
      <div className="font-semibold mt-3">
        <ul>
          <li>May be broadly based on Economic and Social issues, emerging trends in Banking and Technology, Current events, Ethics, etc.</li>
        </ul>
      </div>
      <div className="flex flex-col gap-y-3 mt-4">
        <Describe heading="Benefits of IBPS PO Descriptive Writing Test 2025" subHeading="Our expert-curated descriptive writing test will enhance your writing skills and make you exam-ready. Descriptive writing examples are provided too, with solutions to help the candidates get an idea of the descriptive writing for major bank exams. Candidates can learn how to write a structured essay and answer comprehension questions with these practice tests. The solutions are provided in a clear format of how the descriptive test answers should be. Succeed in the upcoming IBPS PO descriptive paper 2025 by preparing well with these descriptive writing tests. Practice now with the guidely's descriptive papers and score well." />
        <Describe heading="Features included in the IBPS PO Descriptive Test 2025" subHeading="Enhance your writing skills and learn new techniques to approach essay writing, and ensure your success by practicing with the questions given here. Here we have provided enough tests to make your descriptive writing for IBPS PO mains 2025 preparation a victorious one. Effective tips and tricks, and time management techniques can be learned by consistently preparing with this IBPS PO descriptive writing mock test. Utilize this descriptive paper test for exact exam-oriented preparation for the upcoming IBPS PO mains examination. Boost your confidence in the examination and enhance your time management skills." />
        <div className="font-semibold text-lg">
          Note: Descriptive Paper may be evaluated by an automated scoring mechanism for identifying features related to writing proficiency. This scoring mechanism is duly validated and evaluates the proficiency of test takers.
        </div>

        <div className="underline font-semibold mt-4 text-blue-500 text-xl cursor-pointer">
          Descriptive test
        </div>

      </div>
      <div className="flex mt-5" >
        <div className="flex flex-col items-center gap-y-3">
          {tests.map(test => {
            return <Test key={test.id} id={test.id} title={test.title} language={test.language} questions={test.questions} time={test.time} />
          })}
        </div>
      </div>

      <h1 className="font-semibold text-3xl mt-10">FAQs - IBPS PO Descriptive Writing Mock Test</h1>
      <Faq heading="1. What’s included in the Descriptive Writing Test package for IBPS PO Mains?" subHeading="The package includes practice sets focused on descriptive writing, with sample PDFs available for each set. You also get 6 months of access, all exclusively available through our website." />
      <Faq heading="2. How can I access the Descriptive Writing Test package?" subHeading="You can access the package directly from our website. After purchasing, simply log in to your account and download the practice sets and sample PDFs." />
      <Faq heading="3. How long is the validity of the package?" subHeading="The package comes with a 6-month validity. You’ll have full access to all materials for 6 months from the date of purchase." />
      <Faq heading="4. Can I access the Descriptive Writing Test package on mobile?" subHeading="Yes! The package is accessible on any device, including mobile and tablet, as long as you have internet access and a browser to visit our website." />
      <Faq heading="5. Is the Descriptive Writing Test package part of the Platinum Package?" subHeading="No, this package is separate and not included in the Platinum Package. It focuses exclusively on descriptive writing for IBPS PO Mains." />
      <Faq heading="6. What type of practice sets will I find in the package?" subHeading="The package includes practice sets designed to help you improve your writing skills for the IBPS PO Mains exam. These sets cover a range of topics, from essay writing to answering comprehension questions with answers." />
      <Faq heading="7. How can I use the sample PDFs to improve my writing?" subHeading="The sample PDFs contain examples of the writing tasks you might face in the exam. After attempting the exercises, you can compare your responses with the model answers to see how you can improve your structure, style, and language." />
      <Faq heading="8. Is this package suitable for beginners?" subHeading="Absolutely! The Descriptive Writing Test package is designed to cater to all levels. If you’re a beginner, start with the basic practice sets and gradually challenge yourself with more advanced exercises." />
      <Rating />
    </div>

    <Footer />
  </div>
}
