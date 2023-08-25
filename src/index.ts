type Document = {
  id?: string;
  vector?: number[];
  vectorMag?: number;
  metadata?: any;
};

function magnitude(vector: number[]): number {
  const mag: number = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
  return mag;
}

function cosineSimilarity(dotProduct: number, magA: number, magB: number): number {
  return dotProduct / (magA * magB);
}

function normalize(score: number): number {
  return (score + 1) / 2;
}

function similarityScores(
    documents: Document[],
    queryVector: number[],
    queryMagnitude: number,
    topN: number
  ): [Document, number, any][] {
    const scores: any[] = documents.map((doc) => {
      const dotProduct: number = doc.vector.reduce((sum, val, i) => sum + val * queryVector[i], 0);
      let score: number = cosineSimilarity(dotProduct, doc.vectorMag, queryMagnitude);
      score = normalize(score);
      return [doc, score];
    });
  
    scores.sort((a, b) => b[1] - a[1]);
    return scores.slice(0, topN);
  }
  

export { normalize, cosineSimilarity, magnitude, similarityScores, Document };
