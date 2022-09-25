export function GetStaticFile(file) {
    return `/static${file}`
  }

export function CreateArrayFromInt(count=1, limit=10) {

  const pages_count = count  / limit
  let pages = [];
  for (let i=1; i <= pages_count; i += 1){
    pages.push(i)
  }
  return pages
}