import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";
import axios from "axios";

const apiEndpoint = process.env.API_ENDPOINT;

const postsDirectory = path.join(process.cwd(), "posts");

export async function getSortedPostsData() {
  const res = await axios.get(`${apiEndpoint}/posts/published`);
  const posts = res?.data;
  return posts;
  // return axios
  //   .get(`https://michael-blog-api-prod.herokuapp.com/posts/published`)
  //   .then((res) => {
  //     const allPostsData = res.data;

  //     return allPostsData.sort((a, b) => {
  //       if (a.date < b.date) {
  //         return 1;
  //       } else {
  //         return -1;
  //       }
  //     });
  //   })
  //   .catch((err) => {
  //     console.log("error", err);
  //   });
}

export async function getAllPostIds() {
  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  const res = await axios.get(`${apiEndpoint}/posts/published`);

  const allPostIds = res?.data?.map((item) => {
    return {
      params: {
        id: item.id,
      },
    };
  });

  return allPostIds;
}

export async function getPostData(id) {
  const res = await axios.get(`${apiEndpoint}/post/${id}`);

  const post = res?.data;

  return post;
}
