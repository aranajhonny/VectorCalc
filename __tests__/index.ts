import * as VectorCalc from '../lib/index';

describe('VectorCalc Library Tests', () => {
  test('Calculate magnitude of a vector', () => {
    const vector: number[] = [0.1, 0.2, 0.3];
    const mag: number = VectorCalc.magnitude(vector);
    expect(mag).toBeCloseTo(0.3742, 4);
  });

  test('Calculate cosine similarity score', () => {
    const dotProduct = 0.2;
    const magA = 0.5;
    const magB = 0.6;
    const similarityScore: number = VectorCalc.cosineSimilarity(dotProduct, magA, magB);
    expect(similarityScore).toBeCloseTo(0.6667, 4);
  });

  test('Normalize a score', () => {
    const scoreToNormalize = 0.75;
    const normalizedScore: number = VectorCalc.normalize(scoreToNormalize);
    expect(normalizedScore).toBeCloseTo(0.875, 4);
  });

  test('Calculate similarity scores for a list of documents', () => {
    const queryVector: number[] = [0.1, 0.2, 0.3];
    const queryMagnitude: number = VectorCalc.magnitude(queryVector);

    const documents: VectorCalc.Document[] = [
      {
        vector: [0.1, 0.3, 0.6],
        vectorMag: VectorCalc.magnitude([0.1, 0.3, 0.6]),
      },
      {
        vector: [0.1, 0.2, 0.5],
        vectorMag: VectorCalc.magnitude([0.1, 0.2, 0.5]),
      },
    ];

    const scores: any[] = VectorCalc.similarityScores(
      documents,
      queryVector,
      queryMagnitude,
      2
    );

    const expectedScores: any[] = [
      [documents[0], 0.9926],
      [documents[1], 0.988],
    ];

    scores.forEach(([doc, score], index) => {
      expect(doc).toEqual(expectedScores[index][0]);
      expect(score).toBeCloseTo(expectedScores[index][1], 4);
    });
  });
});
