import { useEffect, useState } from 'react';
import { Card, Text, Badge, Button, Loader, Group } from '@mantine/core';
import React from 'react';
function AdaptiveProblem({ studentId }) {
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    fetch(`/api/problems/${studentId}`)
      .then(res => res.json())
      .then(data => {
        setProblem(data.recommended);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch problem:', err);
        setLoading(false);
      });
  }, [studentId]);

  const handleMarkSolved = async () => {
    try {
      const res = await fetch('/api/attempts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId,
          problemId: problem._id,
          correct: true,
          timestamp: new Date()
        })
      });
      const data = await res.json();
      if (res.ok) {
        setSolved(true);
      } else {
        console.error('Failed to mark as solved:', data.error);
      }
    } catch (err) {
      console.error('Error marking as solved:', err);
    }
  };

  if (loading) return <Loader />;
  if (!problem) return <Text>No problem found</Text>;

  return (
    <Card shadow="md" padding="lg" radius="md" withBorder>
      <Group position="apart">
        <Text size="xl" weight={700}>{problem.title}</Text>
        <Badge color={
          problem.difficulty === 'easy' ? 'green' :
          problem.difficulty === 'medium' ? 'yellow' : 'red'
        }>
          {problem.difficulty}
        </Badge>
      </Group>

      <Text mt="sm">{problem.description || 'No description provided.'}</Text>
      <Text mt="sm" color="dimmed">Tags: {problem.tags?.join(', ')}</Text>
      <Text mt="md" component="pre" style={{ backgroundColor: '#f8f9fa', padding: '1rem', borderRadius: '5px' }}>
        {problem.solution}
      </Text>

      <Button mt="md" color="blue" onClick={handleMarkSolved} disabled={solved}>
        {solved ? 'Marked as Solved ✅' : 'Mark as Solved'}
      </Button>
    </Card>
  );
}

export default AdaptiveProblem;