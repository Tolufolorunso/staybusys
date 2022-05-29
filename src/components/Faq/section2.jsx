import { Button, Divider, Typography } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import Faq from "react-faq-component";


const data = {
  rows: [
    {
      title: "How can i join StayBusy",
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra nulla facilisis aliquet ipsum posuere amet. Mollis et ac quis velit risus sollicitudin. Interdum aliquam faucibus at sit id. Mauris ipsum arcu etiam aliquam.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra nulla facilisis aliquet ipsum posuere amet. Mollis et ac quis velit risus sollicitudin. Interdum aliquam faucibus at sit id. Mauris ipsum arcu etiam aliquam.`,
    },
    {
      title: "Is StayBusy really free?",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra nulla facilisis aliquet ipsum posuere amet. Mollis et ac quis velit risus sollicitudin. Interdum aliquam faucibus at sit id. Mauris ipsum arcu etiam aliquam.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra nulla facilisis aliquet ipsum posuere amet. Mollis et ac quis velit risus sollicitudin. Interdum aliquam faucibus at sit id. Mauris ipsum arcu etiam aliquam.",
    },
    {
      title: "How many currencies can students earn in?",
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra nulla facilisis aliquet ipsum posuere amet. Mollis et ac quis velit risus sollicitudin. Interdum aliquam faucibus at sit id. Mauris ipsum arcu etiam aliquam.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra nulla facilisis aliquet ipsum posuere amet. Mollis et ac quis velit risus sollicitudin. Interdum aliquam faucibus at sit id. Mauris ipsum arcu etiam aliquam.`,
    },
    {
      title:
        "Can I open multiple accounts?",
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra nulla facilisis aliquet ipsum posuere amet. Mollis et ac quis velit risus sollicitudin. Interdum aliquam faucibus at sit id. Mauris ipsum arcu etiam aliquam.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra nulla facilisis aliquet ipsum posuere amet. Mollis et ac quis velit risus sollicitudin. Interdum aliquam faucibus at sit id. Mauris ipsum arcu etiam aliquam.',
    },
    {
      title: "What happens whan I can’t complete a task?",
      content: <p>We reward some participants who complete tasks early, however, this is not a weekly reward. All the work that will be done during the program are hypothetical.</p>,
    },
    {
      title: "How do I withdraw my earnings?",
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra nulla facilisis aliquet ipsum posuere amet. Mollis et ac quis velit risus sollicitudin. Interdum aliquam faucibus at sit id. Mauris ipsum arcu etiam aliquam.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra nulla facilisis aliquet ipsum posuere amet. Mollis et ac quis velit risus sollicitudin. Interdum aliquam faucibus at sit id. Mauris ipsum arcu etiam aliquam.'
    }
  ],
};

const config = {
  animate: true,
  arrowIcon: <AddIcon  />,
  tabFocus: true,
};


function Section2() {
  return (
    <div>
     
     
      <div className='faqBox1'>
      <Faq
        data={data}
        // styles='
        config={config}
      />
      </div>

     

    </div>
  );
}

export default Section2;