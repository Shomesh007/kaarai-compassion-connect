export const impactCategories = [
  {
    id: 1,
    title: "ID Cards for Government School Students",
    description: "Empowering students with identity and dignity",
    images: [
      { url: "/img/id1.jpg", caption: "ID card front example — student photo and details" },
      { url: "/img/id2.jpg", caption: "ID card back example — school & contact info" },
      { url: "/img/id3.jpg", caption: "Printed sample attached to lanyard" },
      { url: "/img/id4.jpg", caption: "Batch of ID cards ready for distribution" },
    ],
  },
  {
    id: 2,
    title: "School Bags for Children in Need",
    description: "Providing school bags and supplies to help children attend school",
    images: [
      { url: "/img/bag1.jpg", caption: "School bags ready for distribution" },
      { url: "/img/bag2.jpg", caption: "Volunteers packing school supplies" },
      { url: "/img/bag3.jpg", caption: "Children receiving school bags" },
      { url: "/img/bag5.jpg", caption: "Supplies and materials inside the bags" },
    ],
  },
  {
    id: 3,
    title: "Elderly Care & Support",
    description: "Providing essentials and compassion to senior citizens",
    images: [
      { url: "/img/elder1.jpg", caption: "Home visit: health & companionship" },
      { url: "/img/elder2.jpg", caption: "Distribution of essential supplies to seniors" },
      { url: "/img/elder3.jpg", caption: "Community care activities for elderly" },
      { url: "/img/elder4.jpg", caption: "Wellness check-up program in progress" },
      { url: "/img/elder5.jpg", caption: "Volunteers assisting daily needs" },
    ],
  },
];

// utility to flatten all image urls
export const allImpactImageUrls = impactCategories.flatMap((c) => c.images.map((i) => i.url));
