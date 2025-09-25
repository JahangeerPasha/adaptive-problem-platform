import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  Text,
  Badge,
  Button,
  Loader,
  Group,
  Divider,
  Container,
  Title,
} from '@mantine/core';

function AdaptiveProblem({ studentId }) {
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [solved, setSolved] = useState(false);

  const quotes = [
    'First, solve the problem. Then, write the code.',
    'Errors are proof that you’re trying.',
    'You’re not stuck. You’re just early in the process.',
    'Every bug you fix is a step toward mastery.',
    'Great coders aren’t born — they’re built one debug session at a time.',
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  useEffect(() => {
    const fetchProblem = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/problems/adaptive/${studentId}`);
        const data = await res.json();
        setProblem(data.recommended);
      } catch (err) {
        console.error('Failed to fetch problem:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [studentId]);

  const handleMarkSolved = () => {
    setSolved(true);
  };

  if (loading) {
    return (
      <Box
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Loader size="lg" />
      </Box>
    );
  }

  if (!problem) {
    return (
      <Box
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text>No problem found</Text>
      </Box>
    );
  }

  return (
    <Box
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <Container size="sm">
        <Card shadow="md" padding="xl" radius="md" withBorder>
          <Group position="apart" mb="xs">
            <Title order={3}>{problem.title}</Title>
            <Badge
              color={
                problem.difficulty === 'easy'
                  ? 'green'
                  : problem.difficulty === 'medium'
                  ? 'yellow'
                  : 'red'
              }
            >
              {problem.difficulty}
            </Badge>
          </Group>

          <Text size="sm" color="dimmed" mb="sm">
            Tags: {problem.tags?.join(', ') || 'None'}
          </Text>

          <Divider my="sm" />

          <Text size="sm" mb="md">
            {problem.description || 'No description provided.'}
          </Text>

          <Text size="sm" color="indigo" style={{ fontStyle: 'italic' }} align="center">
            “{randomQuote}”
          </Text>

          {solved && (
            <Text
              mt="md"
              component="pre"
              style={{
                backgroundColor: '#f8f9fa',
                padding: '1rem',
                borderRadius: '5px',
              }}
            >
              {problem.solution}
            </Text>
          )}

          <Button mt="md" color="blue" onClick={handleMarkSolved} disabled={solved}>
            {solved ? 'Marked as Solved' : 'Mark as Solved'}
          </Button>
        </Card>
      </Container>
    </Box>
  );
}

export default AdaptiveProblem;