

const css = {
    codeBoxCss : {
        wrapper:`border: 2px solid #000;padding: 0px 14px;background-color: #2B2D31;color: #fff;width: 100%;height: auto;border-radius: 8px;`,
        js: {
            const: "color: #FF7B72;",
            function: "color: #D2A8FF;",
            string: "color: #A5D6FF;", 
            cmt: "color: #6A9955;"
        }
    },
    link: {
        refLink: "text-decoration: underline;color: #9f9fff;font-size: 1rem;font-style: italic;"
    }
}
// check is img link
const checkIsImgLink = (input) => {
    const urlRegex = /(http[s]?:\/\/){0,1}(\w+:\w+@){0,1}([a-zA-Z0-9.-]+)(:[0-9]+){0,1}(\/[a-zA-Z0-9.-]+)*\/?/;
    const url = input.match(urlRegex);

    const imageRegex = /\.(jpeg|jpg|gif|png)$/;
    const isImage = imageRegex.test(url[0]);
    console.log(isImage); // Outputs: true
    return isImage;
}

const convertLink = (str) => {
    const {link} = css
    const regex = /\[([^\]]+)\]\((http[^)]+)\)/g;
    
    const newStr = str.replace(regex, `<a href="$2" target="_blank" style="${link.refLink}">$1</a>`);
    
    return newStr;
}

    
const formatCodeBlock = (text) => {

    const { codeBoxCss } = css
    const codeBlockRegex = /```(javascript|js|python|py)\n([\s\S]*?)\n```/gm;

    let codeBlocks = [];
    text.replace(codeBlockRegex, function(match, language, code) {
        // Adjust the code block here

        let htmlCode = `<div style = '${codeBoxCss.wrapper}'>`
        const lists = code.split('\n');
        for (let i = 0; i < lists.length; i++) {
            htmlCode += '<p>' + lists[i] + '</p>';
        }
        htmlCode += '</div>'

        if(language === "javascript" || language === "js") {
            // // change color for string
            // const regexString = /(["'`])(.*?)\1/g;
            // htmlCode = htmlCode.replace(regexString, `<span style="${codeBoxCss.js.string}">$&</span>`);


            // change color for keyword
            const regexcmt = /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm;
            htmlCode = htmlCode.replace(regexcmt, `<span style="${codeBoxCss.js.cmt}">$&</span>`);
            

            // change color for keyword
            const regex = /\b(const|let|var|while|for|this|document|try|catch|console|function)\b/g;
            htmlCode = htmlCode.replace(regex, `<span style="${codeBoxCss.js.const}">$&</span>`);
    
            // change color for function
            const regexFunc = /\b(split|find|some|every|push|replace|log|error|getElementById|querySelector|map|filter|reduce|forEach|sort|reverse|join|pop|shift|unshift|single|post|get)\b/g;
            htmlCode = htmlCode.replace(regexFunc, `<span style="${codeBoxCss.js.function}">$&</span>`);

        }
    
        codeBlocks.push(`\n${htmlCode}\n`);
        return match; // This does not change the original text
    });

    codeBlocks.forEach(codeBlock => {
        text = text.replace(codeBlockRegex, codeBlock);
    });

    return text
}

export default function convertStringToHtml(input) {
    console.log(input)

    let html = ""
    if(checkIsImgLink(input)) 
        return `<img src="${input}" loading="lazy" alt=""/>`;


        
    input = formatCodeBlock(input)

    input = convertLink(input)

    var lines = input.split('\n');

    // Initialize an empty string to store the final HTML

    // Loop through each line
    for (let i = 0; i < lines.length; i++) {
        // Check if the line starts with a tab character
        if (lines[i].startsWith('/t')) {
            // Remove the tab character and add the rest of the line as a tabbed index
            html += '<span style="margin-left: 40px;">' + lines[i].substring(2) + '</span><br>';
        }
        // Check if the line starts with a number
        else if (/^\d+\.\s/.test(lines[i])) {
            // Add the line as an ordered list item
            html += '<ol><li>' + lines[i] + '</li></ol>';
        }
        else {
            html += '<p>' + lines[i] + '</p>';
        }
    }

    // Return the final HTML string
    return html;
}
  

//   // Usage
// const text = "Line 1\nLine 2\tTabbed text";
// const htmlText = textToHtml(text);

