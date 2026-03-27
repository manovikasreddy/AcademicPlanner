import React, { useContext, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { CourseContext } from '../../app/context/CourseContext'

function CourseCard({ course }) {
  const { state, dispatch } = useContext(CourseContext)

  const addToSemester = useCallback((semester) => {
    dispatch({ type: 'ADD_COURSE', semester, course })
  }, [dispatch, course])

  const isInSem1 = state.semesters.semester1.some(c => c.id === course.id)
  const isInSem2 = state.semesters.semester2.some(c => c.id === course.id)
  const isSelected = isInSem1 || isInSem2

  const cardStyle = {
    border: isSelected ? '2px solid #38a169' : '2px solid transparent',
    background: isSelected ? '#f0fff4' : undefined,
    transition: 'border 0.2s, background 0.2s',
    position: 'relative'
  }

  return (
    <div className="course-card" style={cardStyle}>
      {isSelected && (
        <span style={{
          position: 'absolute', top: '8px', right: '10px',
          background: '#38a169', color: '#fff',
          borderRadius: '999px', fontSize: '0.7rem',
          padding: '2px 8px', fontWeight: 600
        }}>
          {isInSem1 && isInSem2 ? '✓ Sem 1 & 2' : isInSem1 ? '✓ Sem 1' : '✓ Sem 2'}
        </span>
      )}
      <h3>{course.name}</h3>
      <p>{course.description}</p>
      <p><strong>Credits:</strong> {course.credits}</p>
      <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', marginTop: '.5rem' }}>
        <button aria-label={`Add ${course.name} to Semester 1`} onClick={() => addToSemester('semester1')}
          style={isInSem1 ? { background: '#38a169' } : {}}>
          {isInSem1 ? '✓ Sem 1' : '+ Sem 1'}
        </button>
        <button aria-label={`Add ${course.name} to Semester 2`} onClick={() => addToSemester('semester2')}
          style={{ background: isInSem2 ? '#276749' : '#805ad5' }}>
          {isInSem2 ? '✓ Sem 2' : '+ Sem 2'}
        </button>
        <Link to={`/course/${course.id}`}
          style={{ fontSize: '.83rem', color: '#3182ce', alignSelf: 'center', marginLeft: 'auto' }}>
          Details →
        </Link>
      </div>
    </div>
  )
}

export default React.memo(CourseCard)
