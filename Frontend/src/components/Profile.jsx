import React from 'react';
import { Card, Text, Title, Group, Box, Image, Container, Divider } from '@mantine/core';

function Profile({ student }) {
  const defaultPic =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzFH6ZObO8B4i4oJJbWi6YOEp5EV3zgEl87A&s';

  const quotes = [
    'Every expert was once a beginner.',
    'Success is the sum of small efforts repeated day in and day out.',
    'Don’t stop when you’re tired. Stop when you’re done.',
    'Code never lies, comments sometimes do.',
    'Debugging is twice as hard as writing the code in the first place.',
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <Box
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #e0f7fa, #fce4ec)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container size="sm">
        <Card shadow="md" padding="l" radius="md" withBorder style={{ textAlign: 'center' }}>
          {/* Profile Picture */}
          <Image
            src={student?.picture || defaultPic}
            alt="Profile"
            width={120}
            height={120}
            style={{ margin: '0 auto', borderRadius: '50%' }}
          />

          {/* Welcome Title */}
          <Title order={2} mt="md" mb="xs">
            Welcome, {student?.name || 'Student'} 👋
          </Title>

          {/* Email */}
          <Text size="sm" color="dimmed" mb="md">
            {student?.email || 'Not provided'}
          </Text>

          {/* Progress */}
          {/* <Group position="apart" mb="xs">
            <Text fw={500}>Progress</Text>
            <Text>Coming soon…</Text>
          </Group> */}

          <Divider my="sm" />

          {/* Motivational Quote */}
          <Text size="sm" color="indigo" italic>
            “{randomQuote}”
          </Text>
        </Card>
      </Container>
    </Box>
  );
}

export default Profile;