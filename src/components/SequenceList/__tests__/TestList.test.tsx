import React from 'react';
import { render, screen } from '@testing-library/react';
import TestList from '../TestList';
import { Test, TestResult } from 'components/SequenceList/TestList';

const test1: Test = {
  description: 'FHIR server makes SMART configuration available from well-known endpoint',
  result: TestResult.Success,
};
const test2: Test = {
  description: 'Well-known configuration contains required fields',
  result: TestResult.Failure,
};
const testList = [test1, test2];

test('Sequence starts out collapsed', () => {
  render(<TestList tests={testList} />);
  const testResultsTab = screen.queryByText('Test Results');
  expect(testResultsTab).toBeNull();
  const firstTest = screen.queryByText(test1.description);
  expect(firstTest).toBeNull();
});