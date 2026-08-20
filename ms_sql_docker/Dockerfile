FROM mcr.microsoft.com/mssql/server:2022-latest

# Switch to root to adjust permissions
USER root

# Give mssql shell access and permissions (if needed)
RUN usermod -s /bin/bash mssql

# Install optional tools
RUN apt-get update && \
    apt-get install -y curl unzip vim && \
    rm -rf /var/lib/apt/lists/*

# Switch back to mssql user
USER mssql

ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=YourStrong!Passw0rd

EXPOSE 1433

CMD ["/opt/mssql/bin/sqlservr"]
