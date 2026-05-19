import axios from 'axios';

async function search() {
  try {
    const res = await axios.get('https://api.github.com/search/code?q=darth+vader+extension:gltf', {
      headers: {
        'User-Agent': 'Node.js'
      }
    });
    console.log(JSON.stringify(res.data.items.slice(0, 3).map((item: any) => item.html_url), null, 2));
  } catch (e: any) {
    console.error(e.message);
  }
}
search();
