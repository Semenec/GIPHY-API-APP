export default function addGifs(state = [],action) {
  if(action === 'ADD_GIF') {
    return [...action.gif_url]
  }
}
