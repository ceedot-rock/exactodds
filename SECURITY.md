# Security Policy

ExactOdds is a fairness protocol. A bug that lets a game produce different
results on different seats, lets a tampered rule pack pass the gate, or lets a
receipt verify against the wrong source is a security issue, not a normal bug.

## Reporting a vulnerability

Please do not open a public issue for security problems.

- Email: corey@slidphilabs.com with the subject line `ExactOdds security`
- Or use GitHub's private vulnerability reporting on this repository
  (Security tab, "Report a vulnerability")

Include the affected file or rule pack, the seat(s) involved, steps or inputs
to reproduce, and what you expected versus what happened.

You can expect an acknowledgement within 3 business days. We will keep you
updated while we investigate and credit you in the changelog unless you prefer
to stay anonymous.

## In scope

- Seat divergence: any input where py, js, ts, c, or cpp output differs
- Gate bypass: a modified `.exactodds` source that still reports PASS
- Receipt or source-hash mismatches
- Commit-reveal weaknesses in the reference games (seed handling, bias)
- The `exactodds` and `exactodds-mcp` npm packages and `exactodds-api`

## Out of scope

- Operator deployments we do not run
- Social engineering, spam, or denial-of-service against hosted demos
