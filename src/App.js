import { useState, useEffect, useRef } from 'react';
import Map from './components/Map';
import Papa from 'papaparse';
import { Header } from './components/Header';
import Loader from './components/Loader';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import "rsuite/dist/rsuite.min.css";
import { DateRangePicker } from 'rsuite';
import {format} from 'date-fns';


function App() {
  
  const[eventData, setEventData] = useState([])
  const[loading, setLoading] = useState(false)
  const[latlngData, setLatlngData] = useState([])
  //const[hasResult, setHasResult] = useState(false)
  const hasResult = useRef(true)

  //For comboBox
  const [display, setDisplay] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [options, setOptions] = useState([]);

  //For DateRangePicker
  const [range, setRange] = useState([])
  const dateRange = useRef()
  const {allowedRange} = DateRangePicker

  useEffect(()=>{
    dateRange.current = range 
  },[range])

  useEffect(()=>{
    hasResult.current = false
  }, [])
  useEffect(()=> {
    const fetchEvents = async() => {
      setLoading(true)
      
      const res = await fetch('https://raw.githubusercontent.com/minhealthnz/nz-covid-data/main/locations-of-interest/august-2021/locations-of-interest.geojson')
      const {features} = await res.json()
  
      setEventData(features)
      setOptions(features)
      setLoading(false)
    }

    fetchEvents()

  }, [])

  const inputKeyword = keyword => {
    setSearchValue(keyword)
    setDisplay(false)
  }

  const twoWeeksbefore = new Date()
  twoWeeksbefore.setDate(twoWeeksbefore.getDate()-13);
  
  return (
    <div>
      <Header/>
      <div className="datepicker">
      <DateRangePicker 
          appearance="default"
          placeholder="Select Date Range"  
          format = 'yyyy-MM-dd'
          disabledDate={allowedRange(twoWeeksbefore, new Date())}
          onSelect={value => {
            setRange([...range, format(value, 'yyyy/MM/dd')])
            }
          }
          onClean={(e) =>{setRange([])}}
          onClick={(e) => setDisplay(false)}
           />
       </div>    
      <div className="search">
          
        <input className="search input"  
            onClick={() => {setDisplay(!display)}} 
            placeholder = {hasResult.current === true ? "Enter an address": "No result"}
            value={searchValue}
            type="search"
            onChange={(e)=>{
              setSearchValue(e.target.value);
              setDisplay(true)
            }}/>
           {display && (
           <div className="autoContainer">
               {options.filter((option) => {

                  function convertDate(originDate){
                    var str = originDate.replace(",", "")
                    str = (str.length < 10 ? "0" +str : str);
                    var dateParts = str.split("/");
                    var date = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
                    var formattedDate = format(date, 'yyyy/MM/dd')
                    
                    return formattedDate
                  }

                  if(dateRange.current.length !== 0){
                    var start = convertDate(option.properties.Start.substr(0,10))
                      if(start >= dateRange.current[dateRange.current.length-2]){
                        var end = convertDate(option.properties.End.substr(0,10))
                        if(end <= dateRange.current[dateRange.current.length-1]){
                          hasResult.current = true
                          if(searchValue === ""){
                            return option
                          }
                          else if(option.properties.Event.toLowerCase().includes(searchValue.toLowerCase())){
                            return option
                          }
                          else 
                            return
                        }
                      }
                      else {
                        hasResult.current = false
                        return
                      } 
                  }else{
                    if(searchValue === ""){
                      return option
                    }
                    else if(option.properties.Event.toLowerCase().includes(searchValue.toLowerCase())){
                      return option
                    }
                  }
               })
                .map((option, i) => {
                   return (<div className="option" 
                                key={i}
                                onClick={()=>{
                                  inputKeyword(option.properties.Event)
                                  console.log(option.properties)
                                  setLatlngData(option)
                                  //setLatlngData(option.geometry.coordinates[1], option.geometry.coordinates[0])
                                }}
                                tabIndex="0">
                              <span>{[option.properties.Event,", ", option.properties.Location]}</span>
                          </div>);
                 })
               }
           </div>)}
      </div>
     
     {!loading ? <Map eventData={eventData} panTo={latlngData}/> : <Loader/>}
     
    </div>
  );
}


export default App;
