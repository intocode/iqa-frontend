import React from 'react';
import { Paper } from 'components/layout/Paper';
import { Title } from 'app/Title/Title';

const HelpPage = () => {
  return (
    <div className="container mt-4">
      <Title>О проекте IQA</Title>
      <Paper>
        <h2>О проекте IQA</h2>
        <p>
          Back when tech enthusiasts realised the power of what would be known as the internet, two
          popular browsers came into existence - the Netscape Navigator & following its success,
          (drumrolls) Microsoft’s Internet explorer. This was even before the W3C standards came
          into picture which would eventually standardise how code would run across different
          browsers. Hence, you can imagine that, given the popularity of these browsers, websites
          were written in two versions - one for the Navigator, and the other one for IE, which
          might sound a little redundant now, but was the norm back then. However, after the W3C
          standards were created and browsers started adhering to them, developers encountered a new
          problem.
        </p>
        <p>
          The problem now was that the legacy code started to break. Hence, a possible solution to
          this was that the sites were now made in two versions - a Standard version (the one which
          we mentioned earlier) which was W3C standards compliant and hence would run across
          different browsers and a Quirks version which supported the legacy code.
        </p>
        <p>
          Now how do browsers identify which mode it needs to use? Well, just add a valid DOCTYPE
          declaration in the first line of the HTML file, to instruct the browser to run the code in
          Standard mode. Anything other than that will trigger the Quirks mode in IE9 or older. This
          is exactly what &lt;!DOCTYPE html&gt does HTML5 onwards. If you fail to add this line to
          your HTML file, the browser would interpret this as an instruction to run your code in
          Quirks mode, and you could end up getting inconsistent results across different browsers.
        </p>
      </Paper>
    </div>
  );
};

export default HelpPage;
