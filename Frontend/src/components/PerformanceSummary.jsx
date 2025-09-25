import { useEffect, useState } from 'react';
import { Card, Text, List, Loader } from '@mantine/core';
import React from 'react';


function PerformanceSummary({ studentId }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/students/${studentId}`)
      .then(res => res.json())
      .then(data => {
        setHistory(data.performanceHistory.slice(-5).reverse()); // last 5 attempts
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch history:', err);
        setLoading(false);
      });
  }, [studentId]);

  if (loading) return <Loader />;
  if (!history.length) return <Text>No attempts yet</Text>;

  return (
    <Card mt="xl" shadow="md" padding="lg" radius="md" withBorder>
      <Text size="lg" weight={600}>Recent Attempts</Text>
      <List spacing="sm" mt="sm">
        {history.map((attempt, index) => (
          <List.Item key={index}>
            Problem ID: {attempt.problemId} — {attempt.correct ? '✅ Solved' : '❌ Failed'} — {new Date(attempt.timestamp).toLocaleDateString()}
          </List.Item>
        ))}
      </List>
    </Card>
  );
}

export default PerformanceSummary;