import { useEffect, useState } from 'react';
import { Table, Badge, Loader, Text } from '@mantine/core';
import React from 'react';
function TopicCoverage({ studentId }) {
  const [coverage, setCoverage] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/students/${studentId}`)
      .then(res => res.json())
      .then(data => {
        const attempts = data.performanceHistory || [];
        const topicStats = {};

        attempts.forEach(attempt => {
          const topic = attempt.topic || 'Unknown'; // make sure topic is included in attempt
          if (!topicStats[topic]) {
            topicStats[topic] = { attempted: 0, correct: 0 };
          }
          topicStats[topic].attempted += 1;
          if (attempt.correct) topicStats[topic].correct += 1;
        });

        const coverageData = Object.entries(topicStats).map(([topic, stats]) => {
          const accuracy = Math.round((stats.correct / stats.attempted) * 100);
          const status =
            accuracy >= 80 ? 'Mastered' :
            accuracy >= 40 ? 'In Progress' : 'Weak';

          return { topic, ...stats, accuracy, status };
        });

        setCoverage(coverageData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching topic coverage:', err);
        setLoading(false);
      });
  }, [studentId]);

  if (loading) return <Loader />;
  if (!coverage.length) return <Text>No topic data available yet</Text>;

  return (
    <Table highlightOnHover withBorder>
      <thead>
        <tr>
          <th>Topic</th>
          <th>Attempted</th>
          <th>Accuracy</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {coverage.map((row, i) => (
          <tr key={i}>
            <td>{row.topic}</td>
            <td>{row.attempted}</td>
            <td>{row.accuracy}%</td>
            <td>
              <Badge color={
                row.status === 'Mastered' ? 'green' :
                row.status === 'In Progress' ? 'yellow' : 'red'
              }>
                {row.status}
              </Badge>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default TopicCoverage;