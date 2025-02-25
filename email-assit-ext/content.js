console.log("Email Assitant - Content Script loaded");

function createButton() {
  const button = document.createElement("button");
  button.className = "ai-reply-button"; // Add a class for styling
  button.style.marginRight = "8px";
  button.style.color = "#0b57d0";
  button.style.background = "white";
  button.style.border = "1px solid #0b57d0";
  button.style.padding = "6px 12px";
  button.style.cursor = "pointer";
  button.style.borderRadius = "4px";

  button.innerHTML = "AI Reply";
  button.setAttribute("title", "Generate AI Reply");

  return button;
}

function getEmailContent() {
  const selectors = [
    ".h7",
    ".a3s.aiL",
    ".gmail_quote",
    '[role = "presentation"]',
  ];
  for (const selector of selectors) {
    const content = document.querySelector(selector);
    if (content) {
      return content.innerText.trim();
    }
    return "";
  }
}

function findComposeToolbar() {
  const selectors = [".btC", ".aDh", '[role="toolbar"]', ".gU.Up"];
  for (const selector of selectors) {
    const toolbar = document.querySelector(selector);
    if (toolbar) {
      return toolbar;
    }
    return null;
  }
}

function injectButton() {
  const existingButton = document.querySelector(".email-assistant-button");
  if (existingButton) {
    existingButton.remove();
  }

  const toolbar = findComposeToolbar();
  if (!toolbar) {
    console.log("Compose Toolbar Not found");
    return;
  }
  console.log("ToolBar Found, Creatiing a Button");
  const button = createButton();
  button.classList.add("email-assistant-button");
  button.addEventListener("click", async () => {
    try {
      button.innerHTML = "Generating...";
      button.disabled = true;

      const emailContent = getEmailContent();
      const response = await fetch("http://localhost:8080/api/email/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailContent: emailContent,
          tone: "professional",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate AI Reply");
      }

      const generatedREply = await response.text();
      const composeBox = document.querySelector(
        '[role="textbox"][g_editable="true"][contenteditable="true"]'
      );
      if (composeBox) {
        composeBox.focus();
        document.execCommand("insertText", false, generatedREply);
      } else {
        console.log("Compose Box not found");
      }
    } catch (err) {
      console.log(err);
      alert("Failed to generate AI Reply");
    } finally {
      button.innerHTML = "Ai Reply";
      button.disabled = false;
    }
  });

  toolbar.insertBefore(button, toolbar.firstChild);
}

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    const addedNodes = Array.from(mutation.addedNodes);
    const hasComposeElemnets = addedNodes.some(
      (node) =>
        node.nodeType === Node.ELEMENT_NODE &&
        (node.matches('.aDh, .btC, [role="dialog"]') ||
          node.querySelector('.aDh, .btC, [role="dialog"]'))
    );
    if (hasComposeElemnets) {
      console.log("Compose Element found");
      setTimeout(injectButton, 500);
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
