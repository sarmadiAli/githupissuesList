import useInfiniteScroll from '../hooks/useInfiniteScroll';
import Loading from './Loading';
import React, { useEffect, useState } from 'react'
import { json } from 'body-parser';
import OpenIssueIcon from './OpenIssueIcon';
import CloseIssueIcon from './CloseIssueIcon';


function IssueList() {
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);
  const [currentData, setCurrentData] = useState([])
  /* get data */
  useEffect(() => {
    fetch('http://localhost:9000/issues').then(jsonResponse => jsonResponse.json())
      .then(data => setCurrentData(data))
  }, [])
  function fetchMoreListItems() { }

  return (
    <>
      {
        (!currentData.length) ? <Loading /> :
          currentData.map((item, index) => {
            return (
              <div key={index} className="issue" data-testid="issue">
                {(item.status == 'open') ? <OpenIssueIcon /> : <CloseIssueIcon />} {item.title}
              </div>
            )
          })
      }
      {/* <div className="issues" data-testid="issues"></div> */}
      {/* <Loading /> */}
    </>
  );
}

export default IssueList;
