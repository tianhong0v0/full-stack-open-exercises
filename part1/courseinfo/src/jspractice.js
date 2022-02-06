function println() {
  for (const line of arguments) {
    console.log(line)
  }
}
function makePerson(first, last) {
  return {
    first: first,
    last: last,
    fullName: function () {
      return this.first + ' ' + this.last
    },
    fullNameReversed: function () {
      return this.last + ', ' + this.first
    },
  }
}
var first = 'global'
var s = makePerson('Simon', 'Willison')
var fullName = s.fullName
var fullNameReversed = s.fullNameReversed
println(fullName())
println(fullNameReversed())
println(s.fullName())
println(s.fullNameReversed())
