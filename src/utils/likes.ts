export function getLikes() {
  const data = localStorage.getItem("camisetas_likes");
  return data ? JSON.parse(data) : {};
}

export function setLikes(likes: Record<string, number>) {
  localStorage.setItem("camisetas_likes", JSON.stringify(likes));
}