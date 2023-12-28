// citationsEmbed.js
function generateCitationsEmbed(user, citations, isFavorite = false, isOwn = true, color = 0xF1C40F) {
  const fields = citations.map((citation) => ({
    name: citation.title,
    value: citation.description,
    inline: false
  }));

  let description;
  if (isOwn) {
    description = isFavorite ? 'Here are some random of your favorite citations ! 🌟' : 'Here are some random of your citaitons ! 📚';
  } else {
    description = `Here are some random citaitons of ${user.username} ! 🗣️`;
  }

  return {
    color: color,
    title: 'Do not hesitate to visit our webSite dear writer ✒️',
    url: 'https://startalk-project.onrender.com/',
    author: {
      name: user.username,
      icon_url: user.avatarURL(),
    },
    description: description,
    thumbnail: {
      url: 'https://i.ibb.co/ZLrdb0p/logo.png',
    },
    fields: fields,
    image: {
      url: 'https://i.ibb.co/z56cGZC/image.png',
    },
    timestamp: new Date().toISOString(),
  };
}

module.exports = generateCitationsEmbed;
