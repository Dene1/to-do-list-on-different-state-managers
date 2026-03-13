import { createContext, useContext, useRef, useCallback } from 'react'
import { useTasksStore } from '@/store'

const RefsContext = createContext(null)

export const RefsProvider = ({ children }) => {
  const firstIncompliteTaskRef = useRef(null)
  const firstIncompliteTaskId = useTasksStore(state => state.firstIncompliteTaskId)

  const scrollToFirstIncomplete = useCallback(() => {
    if (firstIncompliteTaskRef.current) {
      firstIncompliteTaskRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  console.log("RefsProvider: firstIncompliteTaskRef", firstIncompliteTaskRef)

  return (
    <RefsContext value={{
      firstIncompliteTaskRef,
      firstIncompliteTaskId,
      scrollToFirstIncomplete
    }}>
      {children}
    </RefsContext>
  )
}

export const useRefs = () => {
  const context = useContext(RefsContext)
  if (!context) {
    throw new Error('useRefs must be used within RefsProvider')
  }
  return context
}