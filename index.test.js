// vectorCalc.test.js

const VectorCalc = require("./");

describe("VectorCalc Library Tests", () => {
  test("Calculate magnitude of a vector", () => {
    const vector = [0.1, 0.2, 0.3];
    const mag = VectorCalc.magnitude(vector);
    expect(mag).toBeCloseTo(0.3742, 4);
  });

  test("Calculate cosine similarity score", () => {
    const dotProduct = 0.2;
    const magA = 0.5;
    const magB = 0.6;
    const similarityScore = VectorCalc.cosineSimilarity(dotProduct, magA, magB);
    expect(similarityScore).toBeCloseTo(0.6667, 4);
  });

  test("Normalize a score", () => {
    const scoreToNormalize = 0.75;
    const normalizedScore = VectorCalc.normalize(scoreToNormalize);
    expect(normalizedScore).toBeCloseTo(0.875, 4);
  });

  test("Calculate similarity scores for a list of documents", () => {
    const queryVector = [0.1, 0.2, 0.3];
    const queryMagnitude = VectorCalc.magnitude(queryVector);

    const documents = [
      {
        vector: [0.1, 0.3, 0.6],
        vectorMag: VectorCalc.magnitude([0.1, 0.3, 0.6]),
      },
      {
        vector: [0.1, 0.2, 0.5],
        vectorMag: VectorCalc.magnitude([0.1, 0.2, 0.5]),
      },
    ];

    const scores = VectorCalc.similarityScores(
      documents,
      queryVector,
      queryMagnitude
    );

    const expectedScores = [
      [documents[0], 0.9926],
      [documents[1], 0.988],
    ];

    scores.forEach(([doc, score], index) => {
      console.log(`Expected: ${expectedScores[index][1]}, Received: ${score}`);
      expect(doc).toEqual(expectedScores[index][0]);
      expect(score).toBeCloseTo(expectedScores[index][1], 4); 
    });
  });
});
