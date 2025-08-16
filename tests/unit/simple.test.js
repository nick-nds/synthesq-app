describe('Simple Test Suite', () => {
  it('should perform basic math', () => {
    expect(2 + 2).toBe(4)
  })

  it('should handle strings', () => {
    const message = 'Hello Jest'
    expect(message).toBe('Hello Jest')
    expect(message).toContain('Jest')
  })

  it('should work with objects', () => {
    const data = { name: 'Test', value: 123 }
    expect(data).toEqual({ name: 'Test', value: 123 })
    expect(data).toHaveProperty('name', 'Test')
  })

  it('should work with arrays', () => {
    const items = ['apple', 'banana', 'orange']
    expect(items).toHaveLength(3)
    expect(items).toContain('banana')
  })
})