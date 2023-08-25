function magnitude(vector) {
  const mag = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
  return mag;
}

function cosineSimilarity(dotProduct, magA, magB) {
  return dotProduct / (magA * magB);
}

function normalize(score) {
  return (score + 1) / 2;
}

function similarityScores(documents, queryVector, queryMagnitude) {
  return documents.map((doc) => {
    const dotProduct = doc.vector.reduce(
      (sum, val, i) => sum + val * queryVector[i],
      0
    );
    let score = cosineSimilarity(dotProduct, doc.vectorMag, queryMagnitude);
    score = normalize(score);
    return [doc, score];
  });
}

module.exports = {
  normalize,
  cosineSimilarity,
  magnitude,
  similarityScores,
};
