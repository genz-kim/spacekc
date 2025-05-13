import './list.scss'
import Card from"../card/Card"

function List({posts}){
  return (
    <div className='list'>
      {posts.map(item=>(
        <Card className="card" key={item.id} item={item}/>
      ))}
    </div>
  )
}

export default List