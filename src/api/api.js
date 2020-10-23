import axios from "axios";

export const fetchTopStories = async () => {
  return await axios.get("//hacker-news.firebaseio.com/v0/topstories.json");
};

export const fetchItem = async id => {
  const res = await axios.get(
    `//hacker-news.firebaseio.com/v0/item/${id}.json`
  );
  return res.data;
};

export const getTopStories = async () => {
  const topstories = await fetchTopStories();
  const items = await Promise.all(
    topstories.data.slice(0, 100).map(id => fetchItem(id))
  );

  // filter out falsy values (null, undefined, etc)
  return items.filter(Boolean);
};

export const getComments = async () => {
  const topstories = await fetchTopStories();
  const items = await Promise.all(
    topstories.data.slice(0, 100).map(id => fetchItem(id))
  );

  const idsStories = items.map(id => {
    return id.kids;
  });

  const comments = await Promise.all(
    idsStories.map(async i => {return await fetchItem(i)})
  );

  return comments.filter(Boolean)
};

export const getStoryComments = async (id) => {
  const story = await fetchItem(id);
  let items;
  
  if(story.kids) {
    items = await Promise.all(
      story.kids.slice(0, 100).map(id => fetchItem(id))
    )
  } else {
    return null;
  }

  return items;
  
}