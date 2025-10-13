import React from 'react'
import Header from '../components/Header'

function PetcareVideo() {
  return (
  
    <>
    <Header/>
    <div className="container-fluid" style={{minHeight:"70vh", backgroundColor:"white"}}>
      <h3 className='text-center py-5 text-primary'>Learn How to Care for Your Pet Like a Pro</h3>
      <div className="d-flex justify-content-around" data-aos="fade-up-right">
        <iframe width="300" height="200" src="https://www.youtube.com/embed/P3PWkQjab5I?si=DVHmGI2YbCoq6mCx" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <iframe width="300" height="200" src="https://www.youtube.com/embed/q7hyE0t0Mfw?si=aTIZUNXd3njkWz3D" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <iframe width="300" height="200" src="https://www.youtube.com/embed/jFMA5ggFsXU?si=aYzMWQ0kJy4S6gfx" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <iframe width="300" height="200" src="https://www.youtube.com/embed/odoOvcvBMIo?si=jyc3npn6UW9M_MYG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <iframe width="300" height="200" src="https://www.youtube.com/embed/DbNNXpeGC7g?si=CGk0k5a05N42EOZ-" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
    </div>
    
    </>
  )
}

export default PetcareVideo