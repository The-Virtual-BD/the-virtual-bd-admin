import React, { useEffect, useState } from 'react';
import Button from '../utilities/Button';

const Faqs = () => {
    return (
        <div>
            <AddFaq />
            {/* <ViewProjects /> */}
        </div>
    );
};

export default Faqs;


const AddFaq = () => {
    const [faqQus, setFaqQus] = useState('');
    const [faqAns, setFaqAns] = useState('');

    const handleFAQForm = e => {
        e.preventDefault();
        console.log(faqQus, faqAns);
    
      };

    return (
        <div >
              <div className="bg-bgclr text-primary w-4/6 mx-auto p-3 mt-5 rounded-lg ">
              <h3 className='px-3 text-2xl font-bold'>Add FAQs</h3>
              <form className='p-3 ' onSubmit={handleFAQForm} >

                    <div class="mb-3 flex flex-col items-start w-full">
                      <label for="faqQus" class="font-bold">Question</label>
                      <input type="text" class="w-full bg-white rounded py-1 px-3 outline-none" id="faqQus" onChange={(e) => setFaqQus(e.target.value)} />
                    </div>
                  

                    <div class="mb-3 flex flex-col items-start w-full">
                      <label for="faqAns" class="font-bold ">Answer</label>
                      <textarea class="w-full bg-white rounded py-1 px-3 outline-none" id='faqAns' rows="5" onChange={(e) => setFaqAns(e.target.value)}></textarea>
                    </div>
                          

                    <div class=" text-center mt-3">
                      <Button type="submit">Submit</Button>
                    </div>
              </form>
        </div>


        </div>
    );
};




const ViewProjects = () => {
    const [faqs, setFaqs] = useState([]);
    useEffect(() => {
        fetch('/faqs.json')
            .then(res => res.json())
            .then(data => setFaqs(data))
    }, []);
  
    return (
        <div className='text-primary p-3'>
            <div className='bg-bgclr w-full px-10  rounded-lg mt-2 py-6'>
                <h2 className='text-2xl text-start font-semibold mb-5'>All FAQS</h2>
                <div className='grid gap-5'>
                    {
                        faqs.map(faq=><AccordionCard key={faq._id} faq={faq} />)
                    }

                </div>
            </div>
        </div>
    )
  };



  

const AccordionCard = ({ faq }) => {
    const { _id, faqQus, faqAns, status } = faq;
    return (
        <div class="accordion">
            <div class="accordion-item bg-white border border-gray-200">
                <h2 class="accordion-header mb-0" id={`heading${_id}`}>
                    <button class="
                    accordion-button
                    relative
                    flex
                    items-center
                    w-full
                    py-4
                    px-5
                    text-base text-gray-800 text-left
                    bg-white
                    border-0
                    rounded-none
                    transition
                    focus:outline-none
                    " type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${_id}`} aria-expanded="true"
                    aria-controls={`collapse${_id}`}>
                    {faqQus}
                    </button>
                </h2>
                        
                <div id={`collapse${_id}`} class="accordion-collapse collapse " aria-labelledby={`heading${_id}`}
                    >
                    <div class="accordion-body py-4 px-5 text-left">
                    {faqAns}
                    </div>
                </div>
            </div>
        </div>
      )
  }

