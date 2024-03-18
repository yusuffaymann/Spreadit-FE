const options = [
    {
      id: 1,
      title: 'Show mature (18+) content',
      description:
        'See NSFW (Not Safe for Work) mature and adult images, videos, written content, and other media in your Reddit feeds and search results.',
    },
  {
    id: 2,
    title: "Blur mature images and media",
    description:
      "Blur previews and thumbnails for any images or videos tagged as NSFW (Not Safe for Work).",
  },
  {
    id: 3,
    title: "Enable home feed recommendations",
    description: "Allow us to introduce recommended posts in your home feed.",
  },
  {
    id: 4,
    title: "Autoplay media",
    description:
      "Play videos and gifs automatically when in the viewport.",
  },
  {
    id: 5,
    title: "Reduce Animations",
    description:
      "Reduce animations on posts, comments, and feeds.",
  },
  {
    id: 6,
    title: "Community themes",
    description:
      "Use custom themes for all communities. You can also turn this off on a per community basis.",
  },
  {
    id: 7,
    title: "Community content sort",
    description:
      "Choose how you would like content organized in communities you visit. This will not affect global feeds such as Home, or Popular.",
      subOptions: [
        {
        id: 8,
        title: "Remember per community",
        description:
        "Enable if you would like each community to remember and use the last content sort you selected for that community.",
     },
      ],
    },
  {
    id: 9,
    title: "Global content view",
    description:
      "Choose how you would like content displayed in feeds. This control is also found above your feed.",
      subOptions: [
        {
        id: 10,
        title: "Remember per community",
        description:
        "Enable if you would like each community to remember and use the last content sort you selected for that community.",
     },
      ],
    },
  {
    id: 11,
    title: "Open posts in new tab",
    description: "Enable to always open posts in a new tab.",
  },
  {
    id: 12,
    title: "Default to markdown",
    description: "When posting, your input will default to markdown text instead of fancy pants.",
    subOptions: [] // No sub-options for this option
  },
  {
    id: 13,
    title: "NSFW",
    description:
      "This content is NSFW (may contain nudity, pornography, profanity or inappropriate content for those under 18)",
  },
  {
    id: 14,
    title: "Allow people to follow you",
    description: "Followers will be notified about posts you make to your profile and see them in their home feed.",
  },
  {
    id: 15,
    title: "Content visibility",
    description: <>
    Posts to this profile can appear in <a href="/all">r/all</a> and your profile can be discovered in <a href="/users">/users</a>
    </>,
  },
  {
    id: 16,
    title: "Active in communities visibility",
    description: "Show which communities I am active on my profile.",
  },
  {
    id: 17,
    title: "Clear history",
    description: "Delete your post views history.",
  },
  ];
  
  export default options;
  