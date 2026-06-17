import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import useTasks from '../hooks/useTasks'
import interactionPlugin from "@fullcalendar/interaction"
import TaskItem from '../components/TaskBoard'
import { type Task } from '../types'

import Popover from '@mui/material/Popover';
import { useState } from 'react'


export default function Calendar() {
  const {tasks}  = useTasks()
  const [hoveredTask,setHoveredTask] = useState<Task | null>(null)
  const [anchorEl,setAnchorEl] = useState<HTMLElement | null>(null)
  const events = tasks.map((t) =>{
    return {id:t.taskId,title:t.title, date:t.dueDate} 

  })
  
  return (
    <>
     <Popover
     slotProps={{
    root: { style: { pointerEvents: 'none' } },
    paper: {
      elevation: 0,
      style: {
        pointerEvents: 'auto',
        backgroundColor: 'transparent',
        boxShadow: 'none',
      }
   
  }}}

    anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'left',
  }}
  transformOrigin={{
    vertical: 'top',
    horizontal: 'left',
  }}
    open={Boolean(hoveredTask)}
    anchorEl={anchorEl}
    onClose={()=>setAnchorEl(null)}>
      {hoveredTask && <TaskItem task={hoveredTask} />}
    </Popover>
    <FullCalendar
      plugins={[ dayGridPlugin,interactionPlugin ]}
      initialView="dayGridMonth"
      events={events}
      eventMouseEnter={(info)=>{
        const task = tasks.find((t)=>t.taskId === info.event.id) || null;
        setAnchorEl(info.el)
        setHoveredTask(task)
      }
    }
    eventMouseLeave={()=>{setHoveredTask(null); setAnchorEl(null)}
    }
    />
   
      </>
  )
}