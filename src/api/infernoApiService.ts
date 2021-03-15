/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { TestSuite, TestSession, TestGroup } from 'models/testSuiteModels';

const apiEndpoint = 'http://localhost:3001/api';

type parameter = {
  name: string;
  value: string;
};

function getEndpoint(route: string, parameters?: parameter[]): string {
  if (parameters) {
    const parametersString = parameters
      .map((parameter) => `${parameter.name}=${parameter.value}`)
      .join('&');
    return `${apiEndpoint}${route}?${parametersString}`;
  }
  return apiEndpoint + route;
}

export function getTestSuites(): Promise<TestSuite[]> {
  let testSets: TestSuite[] = [];
  const testSuitesEndpoint = getEndpoint('/test_suites');
  return fetch(testSuitesEndpoint)
    .then((response) => response.json())
    .then((result) => {
      testSets = result as TestSuite[];
      return testSets;
    })
    .catch((e) => {
      console.log(e);
      return [];
    });
}

export function postTestSessions(testSuiteID: string): Promise<TestSession> {
  const testSuiteIDParameter = { name: 'test_suite_id', value: testSuiteID };
  const postEndpoint = getEndpoint('/test_sessions', [testSuiteIDParameter]);
  return fetch(postEndpoint, { method: 'POST' })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      return result as TestSession;
    })
    .catch((e) => {
      console.log(e);
      return { id: 'error', test_suite_id: testSuiteID };
    });
}

export interface InputValue {
  name: string;
  value: string;
}
export function runTestGroup(
  testSessionId: string,
  testGroupId: string,
  inputs: InputValue[]
): Promise<string> {
  const testGroupIDParameter = { name: 'test_group_id', value: testGroupId };
  const testSessionIDParameter = { name: 'test_session_id', value: testSessionId };
  const testRunEndpoint = getEndpoint('/test_runs', [testGroupIDParameter, testSessionIDParameter]);
  return fetch(testRunEndpoint, { method: 'POST' })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      return 'yeah';
    })
    .catch((e) => {
      console.log(e);
      return 'rip';
    });
}
