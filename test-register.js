
async function testRegister() {
    const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            firstName: 'Test',
            lastName: 'Instructor',
            email: 'test' + Date.now() + '@example.com',
            mobileNumber: '1234567890',
            password: 'password123',
            role: 'Instructor',
            experience: '5 years',
            currentRole: 'Senior Developer',
            resume: 'https://example.com/resume.pdf',
            verificationId: 'https://example.com/id.pdf',
            companyName: 'Test Inc'
        })
    });
    console.log(await res.json());
}
testRegister();
