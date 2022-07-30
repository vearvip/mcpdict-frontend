const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json())

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const { data } = await fetcher("https://www.fastmock.site/mock/5f99ddefce3c648ecfe8396d398bf461/asdf/book") 

  return { props: { data } }
}

function Profile({data}) { 
 
  // 渲染数据
  return <div>3333333333333333333333333333333333333333333{
      JSON.stringify({data})
    }</div>
}

export default Profile