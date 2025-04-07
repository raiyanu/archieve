FROM mcr.microsoft.com/mssql/server:2022-latest

ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=YourStrong!Passw0rd

# Optional: install basic tools (optional if you're debugging inside the container)
RUN apt-get update && \
    apt-get install -y curl unzip vim && \
    rm -rf /var/lib/apt/lists/*

# Expose port
EXPOSE 1433

# Run SQL Server
CMD ["/opt/mssql/bin/sqlservr"]
