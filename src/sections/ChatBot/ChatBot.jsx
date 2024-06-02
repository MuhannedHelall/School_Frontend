import { useEffect } from 'react';

const DifyChatbot = () => {
  useEffect(() => {
    const scriptConfig = document.createElement('script');
    scriptConfig.innerHTML = `
      window.difyChatbotConfig = {
        token: 'e562YFnP2eFpbwjg'
      }
    `;
    document.head.appendChild(scriptConfig);

    const scriptEmbed = document.createElement('script');
    scriptEmbed.src = 'https://udify.app/embed.min.js';
    scriptEmbed.id = 'e562YFnP2eFpbwjg';
    scriptEmbed.defer = true;
    document.head.appendChild(scriptEmbed);

    // Clean up on component unmount
    return () => {
      document.head.removeChild(scriptConfig);
      document.head.removeChild(scriptEmbed);
    };
  }, []);

  return null;
};

export default DifyChatbot;
