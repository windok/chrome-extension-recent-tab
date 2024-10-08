// Listen for messages
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {

  // console.log(`--------------> received msg`, msg);
  if (msg.text === 'windok_clut_remove_overlay') {
    console.log('CLUT: removing overlay')
    document.getElementById('windok-clut-tabs-overlay')?.remove();
  }

  if (msg.text === 'windok_clut_show_overlay') {
    console.log('CLUT: showing overlay')
    document.getElementById('windok-clut-tabs-overlay')?.remove();
    const tabs = msg.tabs || [];
    // console.log('TABS', msg.tabs);

    // Create the div element
    const newDiv = document.createElement('div');

    // Add some content or styles to the div
    newDiv.id = 'windok-clut-tabs-overlay'
    // newDiv.textContent = "This is the new div with absolute positioning.";
    newDiv.style.backgroundColor = "#273f44";
    newDiv.style.padding = "10px";
    newDiv.style.textAlign = "center";
    newDiv.style.width = "100%";

    // Apply absolute positioning
    newDiv.style.position = "fixed";
    newDiv.style.top = "0";
    newDiv.style.left = "0";
    newDiv.style.zIndex = "2147483647";  // Ensures the div is above all other elements

    // Use flexbox to distribute items evenly
    newDiv.style.display = "flex";
    newDiv.style.justifyContent = "space-around";  // Evenly spread items horizontally
    newDiv.style.alignItems = "center";            // Vertically center the items

    const names = tabs.slice(0, 5).map(t => t.title).join("\n")
    for (let i = 0; i <= 5; i++) {
      const tab = tabs[i];

      const child = document.createElement('div');
      child.style.flex = "1";  // Make all child elements take equal width

      child.style.display = "flex";         // Flexbox to align icon and text
      child.style.alignItems = "center";    // Vertically center icon and text

      if (tab) {
        tab.title === document.title && (child.style.backgroundColor = "#ebffa3");
        child.style.color = tab.title === document.title ? '#273f44' : '#ebffa3';
        child.style.fontWeight = tab.title === document.title ? 'bold' : 'normal'
        child.style.lineHeight = '14px'
        child.style.fontSize = '14px'
        child.style.fontStretch = 'condensed'
        child.style.fontFamily = 'Roboto'
        child.style.padding = "10px";
        child.style.paddingRight = "20px";
        child.style.borderStyle = "none";
        // Handle long text overflow
        child.style.overflow = "hidden";        // Hide any overflowing content
        child.style.whiteSpace = "nowrap";      // Prevent text from wrapping
        child.style.textOverflow = "ellipsis";  // Show '...' for overflowing text

        // Create an image element for the icon
        const icon = document.createElement('img');
        icon.src = tab.icon || chrome.runtime.getURL("icon-chrome.png");
        icon.style.width = "14px";
        icon.style.height = "14px";
        icon.style.marginRight = "8px";  // Space between icon and text

        // Create a span for the text content
        const text = document.createElement('span');
        text.textContent = tab.title;
        // Handle long text overflow
        text.style.overflow = "hidden";        // Hide any overflowing content
        text.style.whiteSpace = "nowrap";      // Prevent text from wrapping
        text.style.textOverflow = "ellipsis";  // Show '...' for overflowing text


        // Add the icon and text to the child div
        child.appendChild(icon);
        child.appendChild(text);
      }

      newDiv.appendChild(child);
    }

    // Insert the new div at the beginning of the body
    document.body.insertBefore(newDiv, document.body.firstChild);
  }
});