// used to mock the database

type Review = {
  reviewId: string;
  review: string;
};
export interface Books {
  isbn: string;
  title: string;
  author: string;
  reviews: Review[];
}

// export const bookList: Books[] = [
//   {
//     isbn: "abcd",
//     title: "Theprioryoftheorangetree",
//     author: "Samantha Shannon",
//     reviews: 
//     [
//       {
//         reviewId: '1',
//         review: "this is one review.",
//       },
//       {
//         reviewId: '2',
//         review: "second review",
//       },
//     ],
//   },
      
//   {
//     isbn: "xyz",
//     title: "Theprioryoftheorangetree",
//     author: "Samantha Shannon",
//     reviews: [
//       {
//         reviewId: '3',
//         review: "The Priory of the Orange Tree is a 2019 fantasy novel by writer Samantha Shannon.[1] The novel was published on 26 February 2019 by Bloomsbury Publishing.",
//       },
//       {
//         reviewId: '4',
//         review: "The Priory of the Orange Tree is a 2019 fantasy novel by writer Samantha Shannon.[1] The novel was published on 26 February 2019 by Bloomsbury Publishing.",
//       },
//     ],
//   },
//   {
//     isbn: "978-0-316-54142-8",
//     title: "The Bone Shard Daughter",
//     author: "Andrea Stewart",
//     reviews: [
//       {
//         reviewId: '5',
//         review: "The Bone Shard Daughter is the first book in the Drowning Empire fantasy trilogy by Andrea Stewart, published in 2020.",
//       },
//       {
//         reviewId: '6',
//         review: "The Bone Shard Daughter is the first book in the Drowning Empire fantasy trilogy by Andrea Stewart, published in 2020.",

//       },
//     ],
//   },
//   {
//     isbn: "9780593874813",
//     title: "Lady MacBeth",
//     author: "Ava Reid",
//     reviews:
//       [
//         {
//           reviewId: '6',
//           review: "Reid has said Lady Macbeth is her favorite character, due to her ambition and wiles, which inspired her to explore her character in a novel of her own. She calls the novel a work of 'gothic, feminist fiction'.",
//       }
//     ]
//   },
//   {
//     isbn: "978-0008108427",
//     title: "An Ember in the Ashes",
//     author: "Sabaa Tahir",
//     reviews:[{
//     reviewId: '7',
//     review: "When Laia’s grandparents are brutally murdered and her brother arrested for treason by the empire, the only people she has left to turn to are the rebels.",
//   },]
// },
// ];
